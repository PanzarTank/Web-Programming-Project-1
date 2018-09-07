$(function () {

    var player = 1;
    var table = $('table');
    var messages = $('.messages');
    var turn = $('.turn');
    var p1 = $('.P1wins');
    var p2 = $('.P2wins');
    var tied = $('.ties');
    var r = $('.round');
    displayNextPlayer(turn, player);

    var p1wins = 0;
    var p2wins = 0;
    var ties = 0;
    var round = 0;

    $('td').click(function () {
        td = $(this);
        var currClass = getcurrClass(td);
        if ((!currClass) && ($('#messages').text().indexOf('has won.') == -1)) {
            var pattern = XorO(player);
            changecurrClass(td, pattern);
            messages.html("");
            if (checkwin(table, pattern) && ($('#messages').text().indexOf('has won.') == -1)) {
                messages.html('Player ' + player + ' has won.');
                turn.html("");
                if (player == 1) {
                    p1wins++;
                    p1.html('Player 1 Wins: ' + p1wins);
                } else {
                    p2wins++;
                    p2.html('Player 2 Wins: ' + p2wins);
                }
            } else if ((checkTie(table)) == 1) {
                messages.html("It's a Tie.");
                turn.html("");
                ties++;
                tied.html("Ties: " + ties);
            } else if (($('#messages').text().indexOf('has won.') == -1)) {
                player = setNextPlayer(player);
                displayNextPlayer(turn, player);
                messages.html("");
            }
        } else if (($('#messages').text().indexOf('has won.') == -1) && ((checkTie(table)) == -1)) {
            messages.html('This box is already checked.');
        } else {
            alert("Reset the Game");
        }
    });

    $('.restart').click(function () {
        location.reload();
        alert("Resetting Scores Successful");
    });

    $('.reset').click(function () {
        player = 1;
        round = 1;
        messages.html('');
        reset(table);
        displayNextPlayer(turn, player);
    });
});

function getcurrClass(td) {
    if (td.hasClass('cross') || td.hasClass('circle')) {
        return 1;
    } else {
        return 0;
    }
}

function changecurrClass(td, pattern) {
    td.removeClass('default');
    return td.addClass(pattern);
}

function XorO(player) {
    if (player == 1) {
        return 'cross';
    } else {
        return 'circle';
    }
}

function setNextPlayer(player) {
    if (player == 1) {
        return player = 2;
    } else {
        return player = 1;
    }
}

function displayNextPlayer(turn, player) {
    turn.html('Player turn : ' + player);
}

function checkTie(table) {
    var tie = 0;
    if (($('#cell1').hasClass('default') == false) && ($('#cell2').hasClass('default') == false) && ($('#cell3').hasClass('default') == false) && ($('#cell4').hasClass('default') == false) && ($('#cell5').hasClass('default') == false) && ($('#cell6').hasClass('default') == false) && ($('#cell7').hasClass('default') == false) && ($('#cell8').hasClass('default') == false) && ($('#cell9').hasClass('default') == false)) {
        tie = 1;
    }
    return tie;
}

function checkwin(table, pattern) {
    var won = 0;
    if ($('#cell1').hasClass(pattern) && $('#cell2').hasClass(pattern) && $('#cell3').hasClass(pattern)) {
        won = 1;
    } else if ($('#cell1').hasClass(pattern) && $('#cell4').hasClass(pattern) && $('#cell7').hasClass(pattern)) {
        won = 1;
    } else if ($('#cell1').hasClass(pattern) && $('#cell5').hasClass(pattern) && $('#cell9').hasClass(pattern)) {
        won = 1;
    } else if ($('#cell3').hasClass(pattern) && $('#cell6').hasClass(pattern) && $('#cell9').hasClass(pattern)) {
        won = 1;
    } else if ($('#cell4').hasClass(pattern) && $('#cell5').hasClass(pattern) && $('#cell6').hasClass(pattern)) {
        won = 1;
    } else if ($('#cell7').hasClass(pattern) && $('#cell8').hasClass(pattern) && $('#cell9').hasClass(pattern)) {
        won = 1;
    } else if ($('#cell2').hasClass(pattern) && $('#cell5').hasClass(pattern) && $('#cell8').hasClass(pattern)) {
        won = 1;
    } else if ($('#cell7').hasClass(pattern) && $('#cell8').hasClass(pattern) && $('#cell9').hasClass(pattern)) {
        won = 1;
    }
    return won;
}

function reset(table) {
    table.find('td').each(function () {
        $(this).removeClass('circle').removeClass('cross').addClass('default');
    });
}