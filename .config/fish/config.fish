if status is-interactive
    # Commands to run in interactive sessions can go here
    alias config "/usr/bin/git --git-dir=$HOME/dotfiles/ --work-tree=$HOME"
	fish_add_path "$HOME/.cargo/bin"
	fish_add_path "$HOME/.cargo/bin/neovide"
end
