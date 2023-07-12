(provide 'init-evil)

(add-to-list 'load-path (expand-file-name "~/.emacs.d/init"))
;; -----------------------
;; setting up evil-mode
;; -----------------------

(use-package evil
  :init
  (setq evil-want-integration t)
  (setq evil-want-C-u-scroll t)
  (setq evil-vsplit-window-right t)
  (setq evil-split-window-below t)
  (setq evil-want-C-i-jump t)
  (setq evil-undo-system 'undo-tree)
  (evil-mode))

(require 'evil-surround)
(global-evil-surround-mode 1)
