;;; Basics, and testing startup behavior

;; I don't know why, but moving these things around changes the way the window is manipulated
;; on startup. It's less jittery now...very odd. I wonder if working on improving startup time is
;; the key to making it almost imperceivable. Will investigate.
(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)
(set-fringe-mode 10)
(setq inhibit-startup-message t)
(global-display-line-numbers-mode t)


(setq display-line-numbers-type 'relative)
(set-frame-font "Iosevka Nerd Font Medium 16" nil t)
(setq column-number-mode t)
(electric-pair-mode 1)

;; Stuff for C/C++ programming
(setq-default c-default-style '((java-mode . "java")
				(other . "linux")))

(setq-default c-basic-offset 4)

(setq evil-vsplit-window-right t)
(setq evil-split-window-bottom t)

; Melpa and Elpa and Org
;; (require 'package)

;; (setq package-archives '(("melpa" . "https://melpa.org/packages/")
	;;		 ("org" . "https://orgmode.org/elpa/")
		;;	 ("elpa" . "https://elpa.gnu.org/packages/")))

;; (package-initialize)
;; (unless package-archive-contents
  ;; (package-refresh-contents))

;; Tring to get the theme working
(add-to-list 'custom-theme-load-path "~/.emacs.d/themes")
(load-theme 'catppuccin t)
(setq catppuccin-flavor 'mocha)
(catppuccin-reload)

(require 'org)
(org-babel-load-file
 (expand-file-name "config.org"
		   user-emacs-directory))

;; DO NOT EDIT PAST THIS LINE
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(evil use-package)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
