;; speed up emacs
(defvar file-name-handler-alist-original file-name-handler-alist)

(setq gc-cons-threshold most-positive-fixnum
      gc-cons-percentage 0.6
      file-name-handler-alist nil
      site-run-file nil)

(defvar emaget/gc-cons-threshold 100000000)

(add-hook 'emacs-startup-hook
	  (lambda ()
	    (setq gc-cons-threshold emaget/gc-cons-threshold
		  gc-cons-percentage 0.1
		  file-name-handler-alist file-name-handler-alist-original)))

(add-hook 'minibuffer-setup-hook (lambda ()
				   (setq gc-cons-threshold (* emaget/gc-cons-threshold 2))))

(add-hook 'minibuffer-exit-hook (lambda ()
				  (garbage-collect)
				  (setq gc-cons-threshold emaget/gc-cons-threshold)))

;; set up packages
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
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(web-mode use-package helm evil)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
