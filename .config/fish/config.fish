if status is-interactive
    # Commands to run in interactive sessions can go here
    alias config "/usr/bin/git --git-dir=$HOME/dotfiles/ --work-tree=$HOME"
	fish_add_path "~/.cargo/bin"
end
