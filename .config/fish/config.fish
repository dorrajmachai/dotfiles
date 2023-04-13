if status is-interactive
    # Commands to run in interactive sessions can go here
    alias config "/usr/bin/git --git-dir=$HOME/dotfiles/ --work-tree=$HOME"
	fish_add_path "$HOME/.cargo/bin"
	fish_add_path "$HOME/.cargo/bin/neovide"
	fish_add_path "$HOME/.local/bin"
	fish_add_path "$HOME/.config/nvim/lua-language-lerver/bin/lua-language-server"
	fish_add_path "$HOME/bin"
	fish_add_path "/opt/gradle/gradle-8.0.2/bin"
	fish_add_path "$HOME/.rbenv/bin"
	fish_add_path "$HOME/.rbenv/plugins/ruby-build/bin/"

	eval "$(rbenv init -)"
	alias exercism "/home/emaget_/bin/exercism-3.1.0-linux-x86_64/exercism"
	alias nv "nvim"
    alias v "vim"
	alias emacs "emacs --maximized"
end
