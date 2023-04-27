(setq inhibit-startup-message t) ;; This line disables the startup message

(package-initialize)

(use-package helm
  :ensure t)

(require 'helm-config)
(setq helm-split-window-in-side-p t
  helm-move-to-line-cycle-in-source t)

(helm-mode 1)

;; Evil Helm keybindings
(global-set-key (kbd "C-x b") 'helm-buffers-list)
(global-set-key (kbd "C-x r b") 'helm-bookmarks)
(global-set-key (kbd "C-x C-f") 'helm-find-files)
(global-set-key (kbd "C-s") 'helm-occur)
(global-set-key (kbd "M-x") 'helm-M-x)
(global-set-key (kbd "M-y") 'helm-show-kill-ring)
