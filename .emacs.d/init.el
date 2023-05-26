(require 'package)

(setq package-archives '(("melpa" . "https://melpa.org/packages/")
			 ("org" . "https://orgmode.org/elpa/")
			 ("elpa" . "https://elpa.gnu.org/packages/")))

(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

(require 'org)

;; this line tells emacs to use the literate config file we're writing
(org-babel-load-file (expand-file-name (concat user-emacs-directory "config.org")))
