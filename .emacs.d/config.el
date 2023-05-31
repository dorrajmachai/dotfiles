(unless (package-installed-p 'use-package)
  (package-install 'use-package))

(require 'use-package)
(setq use-package-always-ensure t)

(use-package evil
  :ensure t
  :init
    (setq evil-want-C-u-scroll t)
  :config
    (evil-mode 1))

(use-package org
  :ensure t)

(add-to-list 'load-path "~/.emacs.d/neotree/")
(require 'neotree)
(global-set-key [f8] 'neotree-toggle)
(setq neo-smart-open t)
