if status is-interactive
    # Commands to run in interactive sessions can go here
    alias config "/usr/bin/git --git-dir=$HOME/dotfiles/ --work-tree=$HOME" # command i use for my git bare repo
	fish_add_path "$HOME/.cargo/bin" # i need Rust stuff for some things, don't judge me
	fish_add_path "$HOME/.cargo/bin/neovide" # this is the thing i needed Rust for even though I don't use it
	fish_add_path "$HOME/.local/bin" # bin there, done that
	fish_add_path "$HOME/.config/nvim/lua-language-lerver/bin/lua-language-server" # from the time I learned how to set up a language server by myself
	fish_add_path "$HOME/bin" # bin there, part 2
	fish_add_path "/opt/gradle/gradle-8.0.2/bin" # Java is cool even if Oracle isn't. 
	fish_add_path "$HOME/.rbenv/bin" # i should learn ruby sometime but i'm probably not going to
	fish_add_path "$HOME/.rbenv/plugins/ruby-build/bin/" # i need this for Ruby as well

	eval "$(rbenv init -)" # starting the env manager when fish starts
	alias exercism "/home/emaget_/bin/exercism-3.1.0-linux-x86_64/exercism" # exercism > leetcode
	alias nv "nvim" # a Neovim alias
    alias v "vim" # a Vim alias
	alias emacs "emacs --maximized" # open emacs big
	alias xampp "cd /opt/lampp/ && sudo ./manager-linux-x64.run" # for learning PHP from Bro Code
end
