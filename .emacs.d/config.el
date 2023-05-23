(setq inhibit-startup-message t)
(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)
(setq tab-width 4)

(add-to-list 'custom-theme-load-path "~/.emacs.d/themes")
(load-theme 'catppuccin t)

(setq catppuccin-flavor 'mocha)
(catppuccin-set-color 'base "#000000") ;; for the voidppuccin goodness
(catppuccin-reload)

(unless (package-installed-p 'use-package)
			     (package-install 'use-package))

;; set up use-package
(require 'use-package)
(setq use-package-always-ensure t)

;; set up org-mode
(use-package org
	     :ensure t)

;; set up evil mode
(use-package evil
	     :ensure t
	     :config
	     (evil-mode 1))


