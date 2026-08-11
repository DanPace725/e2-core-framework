"""Conservative detection and repair helpers for UTF-8 mojibake."""

from __future__ import annotations


# These are UTF-8 lead bytes commonly left as visible Latin characters when
# UTF-8 text is decoded as Windows-1252 or Latin-1. A sequence is only treated
# as mojibake when its reconstructed bytes form valid UTF-8.
MOJIBAKE_LEAD_BYTES = frozenset((0xC2, 0xC3, 0xCE, 0xCF, 0xE2, 0xEF, 0xF0))


def _windows_1252_byte(character: str) -> int | None:
    codepoint = ord(character)
    if codepoint <= 0xFF:
        return codepoint
    try:
        encoded = character.encode("cp1252")
    except UnicodeEncodeError:
        return None
    return encoded[0] if len(encoded) == 1 else None


def _sequence_at(text: str, index: int) -> tuple[str, str] | None:
    first_byte = _windows_1252_byte(text[index])
    if first_byte not in MOJIBAKE_LEAD_BYTES:
        return None

    if first_byte < 0xE0:
        width = 2
    elif first_byte < 0xF0:
        width = 3
    else:
        width = 4

    source = text[index : index + width]
    if len(source) != width:
        return None
    reconstructed = [_windows_1252_byte(character) for character in source]
    if any(byte is None for byte in reconstructed):
        return None
    try:
        repaired = bytes(reconstructed).decode("utf-8")
    except UnicodeDecodeError:
        return None
    if repaired == source or "\ufffd" in repaired:
        return None
    return source, repaired


def find_mojibake_sequences(text: str) -> list[tuple[int, str, str]]:
    findings: list[tuple[int, str, str]] = []
    index = 0
    while index < len(text):
        match = _sequence_at(text, index)
        if match is None:
            index += 1
            continue
        source, repaired = match
        findings.append((index, source, repaired))
        index += len(source)
    return findings


def repair_mojibake(text: str, max_passes: int = 4) -> tuple[str, int]:
    total_replacements = 0
    current = text
    for _ in range(max_passes):
        findings = find_mojibake_sequences(current)
        if not findings:
            break
        pieces: list[str] = []
        cursor = 0
        for index, source, repaired in findings:
            pieces.append(current[cursor:index])
            pieces.append(repaired)
            cursor = index + len(source)
        pieces.append(current[cursor:])
        current = "".join(pieces)
        total_replacements += len(findings)
    return current, total_replacements
