(setq inhibit-startup-message t)
(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)
(global-display-line-numbers-mode t)
(setq display-line-numbers-type 'relative)
(set-fringe-mode 10)
(set-frame-font "Iosevka Nerd Font Medium 14" nil t)

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
	     :init
             (setq evil-want-C-u-scroll t)
	     :config
	     (evil-mode 1))

(use-package web-mode
	      :ensure t)

(require 'web-mode)
(add-to-list 'auto-mode-alist '("\\.html?\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.css\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.js\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.php\\'" . web-mode))
(defun emaget/web-mode-hook ()
  "Web Mode Hooks"
  (setq web-mode-markup-indent-offset 4)
  (setq web-mode-css-indent-offset 4)
  (setq web-mode-code-indent-offset 4)
)
(add-hook 'web-mode-hook 'emaget/web-mode-hook)
