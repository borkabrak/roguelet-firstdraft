Comment on test ticket.

Let's see what it takes to get this comment on another computer.

So far, I know that this will do it:

LOCAL:
    # Push local ticket info
    ti sync

And on the remote, checkout 'ticgit' and pull.  But there has got to be a ti
<something> command to do that instead.
