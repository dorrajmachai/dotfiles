import io
from collections.abc import Callable, Generator
from typing import Any
from typing_extensions import Final

from serial.rs485 import RS485Settings

XON: Final = b"\x11"
XOFF: Final = b"\x13"
CR: Final = b"\r"
LF: Final = b"\n"
PARITY_NONE: Final = "N"
PARITY_EVEN: Final = "E"
PARITY_ODD: Final = "O"
PARITY_MARK: Final = "M"
PARITY_SPACE: Final = "S"
STOPBITS_ONE: Final = 1
STOPBITS_ONE_POINT_FIVE: float
STOPBITS_TWO: Final = 2
FIVEBITS: Final = 5
SIXBITS: Final = 6
SEVENBITS: Final = 7
EIGHTBITS: Final = 8
PARITY_NAMES: dict[str, str]

class SerialException(OSError): ...
class SerialTimeoutException(SerialException): ...

class PortNotOpenError(SerialException):
    def __init__(self) -> None: ...

class Timeout:
    TIME: Callable[[], float]
    is_infinite: bool
    is_non_blocking: bool
    duration: float
    target_time: float
    def __init__(self, duration: float) -> None: ...
    def expired(self) -> bool: ...
    def time_left(self) -> float: ...
    def restart(self, duration: float) -> None: ...

class SerialBase(io.RawIOBase):
    BAUDRATES: tuple[int, ...]
    BYTESIZES: tuple[int, ...]
    PARITIES: tuple[str, ...]
    STOPBITS: tuple[int, float, int]
    is_open: bool
    portstr: str | None
    name: str | None
    def __init__(
        self,
        port: str | None = ...,
        baudrate: int = ...,
        bytesize: int = ...,
        parity: str = ...,
        stopbits: float = ...,
        timeout: float | None = ...,
        xonxoff: bool = ...,
        rtscts: bool = ...,
        write_timeout: float | None = ...,
        dsrdtr: bool = ...,
        inter_byte_timeout: float | None = ...,
        exclusive: float | None = ...,
    ) -> None: ...
    def read(self, __size: int = ...) -> bytes: ...  # same as io.RawIOBase.read but always returns bytes
    @property
    def port(self) -> str | None: ...
    @port.setter
    def port(self, port: str | None) -> None: ...
    @property
    def baudrate(self) -> int: ...
    @baudrate.setter
    def baudrate(self, baudrate: int) -> None: ...
    @property
    def bytesize(self) -> int: ...
    @bytesize.setter
    def bytesize(self, bytesize: int) -> None: ...
    @property
    def exclusive(self) -> bool | None: ...
    @exclusive.setter
    def exclusive(self, exclusive: bool | None) -> None: ...
    @property
    def parity(self) -> str: ...
    @parity.setter
    def parity(self, parity: str) -> None: ...
    @property
    def stopbits(self) -> float: ...
    @stopbits.setter
    def stopbits(self, stopbits: float) -> None: ...
    @property
    def timeout(self) -> float | None: ...
    @timeout.setter
    def timeout(self, timeout: float | None) -> None: ...
    @property
    def write_timeout(self) -> float | None: ...
    @write_timeout.setter
    def write_timeout(self, timeout: float | None) -> None: ...
    @property
    def inter_byte_timeout(self) -> float | None: ...
    @inter_byte_timeout.setter
    def inter_byte_timeout(self, ic_timeout: float | None) -> None: ...
    @property
    def xonxoff(self) -> bool: ...
    @xonxoff.setter
    def xonxoff(self, xonxoff: bool) -> None: ...
    @property
    def rtscts(self) -> bool: ...
    @rtscts.setter
    def rtscts(self, rtscts: bool) -> None: ...
    @property
    def dsrdtr(self) -> bool: ...
    @dsrdtr.setter
    def dsrdtr(self, dsrdtr: bool | None = ...) -> None: ...
    @property
    def rts(self) -> bool: ...
    @rts.setter
    def rts(self, value: bool) -> None: ...
    @property
    def dtr(self) -> bool: ...
    @dtr.setter
    def dtr(self, value: bool) -> None: ...
    @property
    def break_condition(self) -> bool: ...
    @break_condition.setter
    def break_condition(self, value: bool) -> None: ...
    @property
    def rs485_mode(self) -> RS485Settings | None: ...
    @rs485_mode.setter
    def rs485_mode(self, rs485_settings: RS485Settings | None) -> None: ...
    def get_settings(self) -> dict[str, Any]: ...
    def apply_settings(self, d: dict[str, Any]) -> None: ...
    def send_break(self, duration: float = ...) -> None: ...
    def read_all(self) -> bytes | None: ...
    def read_until(self, expected: bytes = ..., size: int | None = ...) -> bytes: ...
    def iread_until(self, expected: bytes = ..., size: int | None = ...) -> Generator[bytes, None, None]: ...
