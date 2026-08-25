function osc52 -d "Copy stdin to the clipboard using the OSC 52 escape sequence"
    set --local data (cat | base64 | tr -d '\r\n')
    set --local esc \e"]52;c;$data"\a

    # Wrap in a passthrough sequence so it escapes the multiplexer
    if set --query TMUX
        set esc \ePtmux\;\e"$esc"\e\\
    else if string match --quiet 'screen*' -- $TERM
        set esc \eP\e"$esc"\e\\
    end

    # Write straight to the terminal so a pipe does not swallow the sequence,
    # falling back to stdout when there is no controlling terminal
    if sh -c ': >/dev/tty' 2>/dev/null
        printf '%s' $esc >/dev/tty
    else
        printf '%s' $esc
    end
end
