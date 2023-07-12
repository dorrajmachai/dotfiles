(provide 'init-catppuccin)

;; ------------------------
;; setting up catppuccin
;; ------------------------

(use-package catppuccin-theme
  :init
  (setq catpuccin-flavour 'mocha))

(load-theme 'catppuccin :no-confirm)
(setq catppuccin-flavour 'mocha)
(catppuccin-reload)

;; (add-to-list 'custome-theme-load-path "~/.emacs.d/themes")
;; (load-theme 'catppuccin t)
;; (setq catppuccin-flavour 'mocha)
;; (catppuccin-reload)

