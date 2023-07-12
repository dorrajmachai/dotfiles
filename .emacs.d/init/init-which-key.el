(provide 'init-which-key)

;; -------------------------
;; setting up which-key
;; -------------------------

(use-package which-key
  :init
  (which-key-mode)
  (which-key-setup-minibuffer)
  (which-key-show-major-mode t))

