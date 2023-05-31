# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# User specific environment
if ! [[ "$PATH" =~ "$HOME/.local/bin:$HOME/bin:" ]]
then
    PATH="$HOME/.local/bin:$HOME/bin:$PATH"
fi
export PATH

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

alias config='/usr/bin/git --git-dir=$HOME/dotfiles --work-tree=$HOME'

# User specific aliases and functions
if [ -d ~/.bashrc.d ]; then
	for rc in ~/.bashrc.d/*; do
		if [ -f "$rc" ]; then
			. "$rc"
		fi
	done
fi

unset rc
# . "$HOME/.cargo/env"
export PATH="$HOME/.cargo/bin:$PATH"
export PATH="$HOME/.cargo/bin/neovide:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/.config/nvim/lua-language-server/bin/lua-language-server:$PATH"
export PATH="$HOME/bin:$PATH"
export PATH="$HOME/.rbenv/plugins/ruby-build/bin/:$PATH"
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
set PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
