(provide 'init-options)

;; options
(menu-bar-mode -1)
(scroll-bar-mode -1)
(tool-bar-mode -1)
(set-fringe-mode 10)
(tooltip-mode -1)
(column-number-mode)
(global-display-line-numbers-mode t)
(electric-pair-mode 1)

;; making sure there is enough room for the number column
(setq-default display-line-numbers-width 4)

(setq
 electric-pair-preserve-balance nil
 display-line-numbers-type 'relative
 ring-bell-function 'ignore
 initial-scratch-message 'nil
 create-lockfiles nil
 backup-directory-alist '(("." . "~/.saves"))
 backup-by-copying t
 delete-old-versions t
 kept-new-versions 6
 kept-old-versions 2
 version-control t)

;; using the font the bible is written in
(set-face-attribute 'default nil :font "Iosevka Nerd Font Medium 16")
