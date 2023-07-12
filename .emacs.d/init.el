;; this file is meant to be very simple
;; please see the "./init" directory for the rest

(add-to-list 'load-path (expand-file-name "~/.emacs.d/init"))

(mapc 'require '(init-use-package
		 init-evil
		 init-options
		 init-catppuccin
		 init-c-cpp
		 init-keymaps
		 init-org-mode
		 init-undo-tree
		 init-use-package
		 init-which-key
		 init-js2
		 init-dashboard))

(setq custom-file "~/.emacs.d/init/init-custom.el")
(load custom-file)
