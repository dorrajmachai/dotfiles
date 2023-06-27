;; just trying to do this all in one file to encourage thoughtful decision making and maybe speeding up load times.

;; -------------------------------
;; turning on/off basic options
;; -------------------------------

(menu-bar-mode -1) ;; removes menu bar
(scroll-bar-mode -1) ;; removes scroll bar
(tool-bar-mode -1) ;; no tool bar
(set-fringe-mode 10) ;; room to breath
(tooltip-mode -1) ;; no tooltips
(column-number-mode) ;; i want to see the column number in the modeline
(global-display-line-numbers-mode t) ;; need to know where i am in the file
(electric-pair-mode 1)

(setq-default display-line-numbers-width 4) ;; large enough for the thousands
(setq display-line-numbers-type 'relative) ;; relative numbers for evil mode shenanigans
(setq visible-bell t) ;; silent, visible error

;; -------------------
;; setting the font
;; -------------------

(set-face-attribute 'default nil :font "Iosevka Nerd Font Medium 16") ;; this is my preferred font and font size.

;; ---------------------------------------
;; keybindings i like and/or want to try
;; ---------------------------------------

(global-set-key (kbd "C-x C-b") 'ibuffer) ;; this makes buffer switching a little easier...will pair nicely with evil-mode.

;; -------------------------
;; setting up use-package
;; -------------------------

(require 'package)

(setq package-archives '(("melpa" . "https://melpa.org/packages/")
			 ("org" . "https://orgmode.org/elpa/")
			 ("elpa" . "https://elpa.gnu.org/packages/")))

(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

(unless (package-installed-p 'use-package)
  (package-install 'use-package))

(require 'use-package)
(setq use-package-always-ensure t)

;; -----------------------
;; setting up evil-mode
;; -----------------------

(use-package evil
  :init
  (setq evil-want-integration t)
  (setq evil-want-C-u-scroll t)
  (setq evil-vsplit-window-right t)
  (setq evil-split-window-below t)
  (evil-mode))

;; ------------------------
;; setting up catppuccin
;; ------------------------

(use-package catppuccin-theme
  :init
  (setq catpuccin-flavour 'mocha))

(load-theme 'catppuccin :no-confirm)
(setq catppuccin-flavour 'mocha)
(catppuccin-set-color 'base "#000000")
(catppuccin-reload)

;; (add-to-list 'custome-theme-load-path "~/.emacs.d/themes")
;; (load-theme 'catppuccin t)
;; (setq catppuccin-flavour 'mocha)
;; (catppuccin-reload)

;; ------------------------
;; setting up c/cpp stuff
;; ------------------------

(setq-default c-default-style '((java-mode  . "java")
				(other .  "linux")))

(setq-default c-basic-offset 4)

;; -------------------------
;; setting up javascript
;; -------------------------

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(use-package)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
