import tkinter
from _typeshed import Incomplete
from typing import Any
from typing_extensions import Literal

WINDOW: Literal["window"]
TEXT: Literal["text"]
STATUS: Literal["status"]
IMMEDIATE: Literal["immediate"]
IMAGE: Literal["image"]
IMAGETEXT: Literal["imagetext"]
BALLOON: Literal["balloon"]
AUTO: Literal["auto"]
ACROSSTOP: Literal["acrosstop"]

ASCII: Literal["ascii"]
CELL: Literal["cell"]
COLUMN: Literal["column"]
DECREASING: Literal["decreasing"]
INCREASING: Literal["increasing"]
INTEGER: Literal["integer"]
MAIN: Literal["main"]
MAX: Literal["max"]
REAL: Literal["real"]
ROW: Literal["row"]
S_REGION: Literal["s-region"]
X_REGION: Literal["x-region"]
Y_REGION: Literal["y-region"]

# These should be kept in sync with _tkinter constants, except TCL_ALL_EVENTS which doesn't match ALL_EVENTS
TCL_DONT_WAIT: Literal[2]
TCL_WINDOW_EVENTS: Literal[4]
TCL_FILE_EVENTS: Literal[8]
TCL_TIMER_EVENTS: Literal[16]
TCL_IDLE_EVENTS: Literal[32]
TCL_ALL_EVENTS: Literal[0]

class tixCommand:
    def tix_addbitmapdir(self, directory: str) -> None: ...
    def tix_cget(self, option: str) -> Any: ...
    def tix_configure(self, cnf: dict[str, Any] | None = None, **kw: Any) -> Any: ...
    def tix_filedialog(self, dlgclass: str | None = None) -> str: ...
    def tix_getbitmap(self, name: str) -> str: ...
    def tix_getimage(self, name: str) -> str: ...
    def tix_option_get(self, name: str) -> Any: ...
    def tix_resetoptions(self, newScheme: str, newFontSet: str, newScmPrio: str | None = None) -> None: ...

class Tk(tkinter.Tk, tixCommand):
    def __init__(self, screenName: str | None = None, baseName: str | None = None, className: str = "Tix") -> None: ...

class TixWidget(tkinter.Widget):
    def __init__(
        self,
        master: tkinter.Misc | None = None,
        widgetName: str | None = None,
        static_options: list[str] | None = None,
        cnf: dict[str, Any] = ...,
        kw: dict[str, Any] = ...,
    ) -> None: ...
    def __getattr__(self, name: str): ...
    def set_silent(self, value: str) -> None: ...
    def subwidget(self, name: str) -> tkinter.Widget: ...
    def subwidgets_all(self) -> list[tkinter.Widget]: ...
    def config_all(self, option: Any, value: Any) -> None: ...
    def image_create(self, imgtype: str, cnf: dict[str, Any] = ..., master: tkinter.Widget | None = None, **kw) -> None: ...
    def image_delete(self, imgname: str) -> None: ...

class TixSubWidget(TixWidget):
    def __init__(self, master: tkinter.Widget, name: str, destroy_physically: int = 1, check_intermediate: int = 1) -> None: ...

class DisplayStyle:
    def __init__(self, itemtype: str, cnf: dict[str, Any] = ..., *, master: tkinter.Widget | None = None, **kw) -> None: ...
    def __getitem__(self, key: str): ...
    def __setitem__(self, key: str, value: Any) -> None: ...
    def delete(self) -> None: ...
    def config(self, cnf: dict[str, Any] = ..., **kw): ...

class Balloon(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def bind_widget(self, widget: tkinter.Widget, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def unbind_widget(self, widget: tkinter.Widget) -> None: ...

class ButtonBox(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add(self, name: str, cnf: dict[str, Any] = ..., **kw) -> tkinter.Widget: ...
    def invoke(self, name: str) -> None: ...

class ComboBox(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add_history(self, str: str) -> None: ...
    def append_history(self, str: str) -> None: ...
    def insert(self, index: int, str: str) -> None: ...
    def pick(self, index: int) -> None: ...

class Control(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def decrement(self) -> None: ...
    def increment(self) -> None: ...
    def invoke(self) -> None: ...

class LabelEntry(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...

class LabelFrame(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...

class Meter(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...

class OptionMenu(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add_command(self, name: str, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add_separator(self, name: str, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def delete(self, name: str) -> None: ...
    def disable(self, name: str) -> None: ...
    def enable(self, name: str) -> None: ...

class PopupMenu(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def bind_widget(self, widget: tkinter.Widget) -> None: ...
    def unbind_widget(self, widget: tkinter.Widget) -> None: ...
    def post_widget(self, widget: tkinter.Widget, x: int, y: int) -> None: ...

class Select(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add(self, name: str, cnf: dict[str, Any] = ..., **kw) -> tkinter.Widget: ...
    def invoke(self, name: str) -> None: ...

class StdButtonBox(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def invoke(self, name: str) -> None: ...

class DirList(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def chdir(self, dir: str) -> None: ...

class DirTree(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def chdir(self, dir: str) -> None: ...

class DirSelectDialog(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def popup(self) -> None: ...
    def popdown(self) -> None: ...

class DirSelectBox(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...

class ExFileSelectBox(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def filter(self) -> None: ...
    def invoke(self) -> None: ...

class FileSelectBox(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def apply_filter(self) -> None: ...
    def invoke(self) -> None: ...

class FileEntry(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def invoke(self) -> None: ...
    def file_dialog(self) -> None: ...

class HList(TixWidget, tkinter.XView, tkinter.YView):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add(self, entry: str, cnf: dict[str, Any] = ..., **kw) -> tkinter.Widget: ...
    def add_child(self, parent: str | None = None, cnf: dict[str, Any] = ..., **kw) -> tkinter.Widget: ...
    def anchor_set(self, entry: str) -> None: ...
    def anchor_clear(self) -> None: ...
    # FIXME: Overload, certain combos return, others don't
    def column_width(self, col: int = 0, width: int | None = None, chars: int | None = None) -> int | None: ...
    def delete_all(self) -> None: ...
    def delete_entry(self, entry: str) -> None: ...
    def delete_offsprings(self, entry: str) -> None: ...
    def delete_siblings(self, entry: str) -> None: ...
    def dragsite_set(self, index: int) -> None: ...
    def dragsite_clear(self) -> None: ...
    def dropsite_set(self, index: int) -> None: ...
    def dropsite_clear(self) -> None: ...
    def header_create(self, col: int, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def header_configure(self, col: int, cnf: dict[str, Any] = ..., **kw) -> Incomplete | None: ...
    def header_cget(self, col: int, opt): ...
    def header_exists(self, col: int) -> bool: ...
    def header_exist(self, col: int) -> bool: ...
    def header_delete(self, col: int) -> None: ...
    def header_size(self, col: int) -> int: ...
    def hide_entry(self, entry: str) -> None: ...
    def indicator_create(self, entry: str, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def indicator_configure(self, entry: str, cnf: dict[str, Any] = ..., **kw) -> Incomplete | None: ...
    def indicator_cget(self, entry: str, opt): ...
    def indicator_exists(self, entry: str) -> bool: ...
    def indicator_delete(self, entry: str) -> None: ...
    def indicator_size(self, entry: str) -> int: ...
    def info_anchor(self) -> str: ...
    def info_bbox(self, entry: str) -> tuple[int, int, int, int]: ...
    def info_children(self, entry: str | None = None) -> tuple[str, ...]: ...
    def info_data(self, entry: str) -> Any: ...
    def info_dragsite(self) -> str: ...
    def info_dropsite(self) -> str: ...
    def info_exists(self, entry: str) -> bool: ...
    def info_hidden(self, entry: str) -> bool: ...
    def info_next(self, entry: str) -> str: ...
    def info_parent(self, entry: str) -> str: ...
    def info_prev(self, entry: str) -> str: ...
    def info_selection(self) -> tuple[str, ...]: ...
    def item_cget(self, entry: str, col: int, opt): ...
    def item_configure(self, entry: str, col: int, cnf: dict[str, Any] = ..., **kw) -> Incomplete | None: ...
    def item_create(self, entry: str, col: int, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def item_exists(self, entry: str, col: int) -> bool: ...
    def item_delete(self, entry: str, col: int) -> None: ...
    def entrycget(self, entry: str, opt): ...
    def entryconfigure(self, entry: str, cnf: dict[str, Any] = ..., **kw) -> Incomplete | None: ...
    def nearest(self, y: int) -> str: ...
    def see(self, entry: str) -> None: ...
    def selection_clear(self, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def selection_includes(self, entry: str) -> bool: ...
    def selection_set(self, first: str, last: str | None = None) -> None: ...
    def show_entry(self, entry: str) -> None: ...

class CheckList(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def autosetmode(self) -> None: ...
    def close(self, entrypath: str) -> None: ...
    def getmode(self, entrypath: str) -> str: ...
    def open(self, entrypath: str) -> None: ...
    def getselection(self, mode: str = "on") -> tuple[str, ...]: ...
    def getstatus(self, entrypath: str) -> str: ...
    def setstatus(self, entrypath: str, mode: str = "on") -> None: ...

class Tree(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def autosetmode(self) -> None: ...
    def close(self, entrypath: str) -> None: ...
    def getmode(self, entrypath: str) -> str: ...
    def open(self, entrypath: str) -> None: ...
    def setmode(self, entrypath: str, mode: str = "none") -> None: ...

class TList(TixWidget, tkinter.XView, tkinter.YView):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def active_set(self, index: int) -> None: ...
    def active_clear(self) -> None: ...
    def anchor_set(self, index: int) -> None: ...
    def anchor_clear(self) -> None: ...
    def delete(self, from_: int, to: int | None = None) -> None: ...
    def dragsite_set(self, index: int) -> None: ...
    def dragsite_clear(self) -> None: ...
    def dropsite_set(self, index: int) -> None: ...
    def dropsite_clear(self) -> None: ...
    def insert(self, index: int, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def info_active(self) -> int: ...
    def info_anchor(self) -> int: ...
    def info_down(self, index: int) -> int: ...
    def info_left(self, index: int) -> int: ...
    def info_right(self, index: int) -> int: ...
    def info_selection(self) -> tuple[int, ...]: ...
    def info_size(self) -> int: ...
    def info_up(self, index: int) -> int: ...
    def nearest(self, x: int, y: int) -> int: ...
    def see(self, index: int) -> None: ...
    def selection_clear(self, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def selection_includes(self, index: int) -> bool: ...
    def selection_set(self, first: int, last: int | None = None) -> None: ...

class PanedWindow(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add(self, name: str, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def delete(self, name: str) -> None: ...
    def forget(self, name: str) -> None: ...  # type: ignore[override]
    def panecget(self, entry: str, opt): ...
    def paneconfigure(self, entry: str, cnf: dict[str, Any] = ..., **kw) -> Incomplete | None: ...
    def panes(self) -> list[tkinter.Widget]: ...

class ListNoteBook(TixWidget):
    def __init__(self, master: tkinter.Widget | None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add(self, name: str, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def page(self, name: str) -> tkinter.Widget: ...
    def pages(self) -> list[tkinter.Widget]: ...
    def raise_page(self, name: str) -> None: ...

class NoteBook(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def add(self, name: str, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def delete(self, name: str) -> None: ...
    def page(self, name: str) -> tkinter.Widget: ...
    def pages(self) -> list[tkinter.Widget]: ...
    def raise_page(self, name: str) -> None: ...
    def raised(self) -> bool: ...

class InputOnly(TixWidget):
    def __init__(self, master: tkinter.Widget | None = None, cnf: dict[str, Any] = ..., **kw) -> None: ...

class Form:
    def __setitem__(self, key: str, value: Any) -> None: ...
    def config(self, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def form(self, cnf: dict[str, Any] = ..., **kw) -> None: ...
    def check(self) -> bool: ...
    def forget(self) -> None: ...
    def grid(self, xsize: int = 0, ysize: int = 0) -> tuple[int, int] | None: ...
    def info(self, option: str | None = None): ...
    def slaves(self) -> list[tkinter.Widget]: ...
