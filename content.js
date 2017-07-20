var videoIds = ["gfzuzDrVRVM", "65v7JSBpQ4U", "j89r0SNk9hs", "83vyrFFjiqQ"];

$.fn.appendUniquelyTo = function (to) {
    if (!$("#" + this.attr("id")).length) this.appendTo(to);
}

$.fn.prependUniquelyTo = function (to) {
    if (!$("#" + this.attr("id")).length) this.prependTo(to);
}

function getVideoId() {
    return $("meta[itemprop='videoId']").attr("content");
}

function addButton(location, text, start, duration) {
    var b = $('<button type="button" class="special-btn btn btn-success" style="margin-right: 1em"></button>');
    b.append(text);
    b.appendUniquelyTo(location);
    b.attr("data-start", start);
    b.attr("data-duration", duration);
}

document.addEventListener("spfdone", process);
document.addEventListener("DOMContentLoaded", process);

function process() {
    var s = $('<script id="injected-jquery" src="' + chrome.extension.getURL('jquery.js') + '"/>');
    s.appendUniquelyTo($(document.documentElement));
    s = $('<script id="injected-script" src="' + chrome.extension.getURL('inject.js') + '" />');
    s.appendUniquelyTo($(document.documentElement));

    var videoId = getVideoId();
    if (videoIds.indexOf(videoId) < 0) return;

    var card = $('<div id="GazeTube" class="yt-card yt-card-has-padding">');
    $("#watch-header").after(card);
    switch (videoId) {
        case "gfzuzDrVRVM": // 不協和音
            addButton(card, "僕は嫌だ", 79.5, 1000);
            addButton(card, "ぼくはいやだ", 151.5, 930);
            addButton(card, "僕は嫌だ", 201.5, 1200);
            break;
        case "65v7JSBpQ4U": // エキセントリック
            addButton(card, "もうそういうのうんざりなんだよ", 47.6, 2350);
            addButton(card, "もうそういうの勘弁してよ", 136, 2300);
            break;
        case "j89r0SNk9hs": // 月曜日の朝、スカートを切られた
            addButton(card, "あんたは私の何を知る？", 175.8, 3200);
            break;
        case "83vyrFFjiqQ": // 世界には愛しかない
            addButton(card, "複雑に見えるこの世界は単純な感情で動いている", 65.5, 4500);
            addButton(card, "夕立も予測できない未来も嫌いじゃない", 152, 4200);
            break;
    }

    window.postMessage({ type: "setButtonClick" }, "*");
}