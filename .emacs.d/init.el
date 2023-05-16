;; speed up emacs


;; set up packages
(require 'package)

(setq package-archives '(("melpa" . "https://melpa.org/packages/")
			 ("org" . "https://orgmode.org/elpa/")
			 ("elpa" . "https://elpa.gnu.org/packages/")))

(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

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

(require 'org)

;; this line tells emacs to use the literate config file we're writing
(org-babel-load-file (expand-file-name (concat user-emacs-directory "config.org")))
