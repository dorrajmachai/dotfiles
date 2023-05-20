(setq inhibit-startup-message t) ;; This line disables the startup message
(tool-bar-mode -1) ;; this line will disable the toolbar
(menu-bar-mode -1) ;; this line will disable the menu bar
(toggle-scroll-bar -1) ;; this line will disable the scroll bar

(add-to-list 'custom-theme-load-path "~/.emacs.d/themes")
(load-theme 'catppuccin t)

(setq catppuccin-flavor 'latte)
(catppuccin-reload)


