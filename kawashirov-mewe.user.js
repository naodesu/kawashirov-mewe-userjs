// ==UserScript==
// @name Kawashirov's Mewe Extensions
// @name:ru Кавашировские расширения для MeWe
// @description WARNING! Chromium-based requires switch --enable-blink-features=ContextMenu 
// @description:ru ВНИМАНИЕ! Для Chromium-подобных требуется флаг --enable-blink-features=ContextMenu 
// @version 0.0.3
// @namespace https://github.com/naodesu/
// @updateURL https://github.com/naodesu/kawashirov-mewe-userjs/raw/master/kawashirov-mewe.user.js
// @license WTFPL
// @include https://mewe.com/*
// @grant GM_setClipboard
// ==/UserScript==

(function() {

	var ICON_LINK_OPEN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAACyElEQVRIx42VW0gUURjHfzO77norS8RLiHaxIkhJiCACAykqEETwwYoeAiWKyi70EgXVg0Z0gyLqyadaCruC0UNBGhRIERRkiUlKRKlptrrqujv/HtbLqjOT//Myc875fuc7//nOGXBSOZ8JMezYRuniCD7DIXw9d1JXZuB1GBbiDwPomNP62+nZqhG5qUnpossJkMcLj+pkuSKWizFHC4y1tJrWKVfAChGa3uQGyshk0hMpimlZ5z1DXHFeZOopl/v8ZpTIjDaOkF/VjhkUTGSQSxNFedRQwsIpZhJNnCFImCLclchLVKX+WfRXWipk6LKLBwUiBOWoVMGJrqiiispSi1YJJeiqq4mxLRxP4wCpQB9v+AlAkAbaSaaew/xfwTyFJEm1QkQJM0oELdQ1/U+xDDwJJAE/eA4/Ocko+dQv4hz7mY9MFPuaYxjwgwYCjHup5iCeeQLiy0L48VGeSwVOp+wxNTPevTbllZJImkP4IyrxkBpXneacORbtvXywDX9IJVHCXOc0muodLpAkdapQvMWPQQUq0dc5njcqSShFiIhp1WlMy0RoLgBSuY22qWNG+F2lCy3RWRHhHa2myrRAdNgBIIMA2haXRUBZQnl6qi8iwg2jkGZ66WKPPQAyCaDNalSnPqpOOUIFeibpvYhyC1jODjbheOn1cAireVcbWYTpZgRUY2ydvBANoJNO+884qT728bBnb082EV4zwtH0RLtpXpciG+IBTzAQYXZiWrgCjFhV+BxuLj9ewwkQIy9mERTTjGWLyMHMxgT+xlyIA/SG8ttYQxq1wJ9ip9/IFjYC0AIRfsWzL/qO13IBgEEG4uFx8rMEgAHW0d3PDlqnx1YxlKl7mo+CqhLiwWz8bqKZOqFPrsEhNapUiA/kznbYSxU3fSnpJNsczkkXxhlkEFrYzXe7Gau5xDdCjm2EIVooZ04x/QP+f6o+O6l8OAAAAABJRU5ErkJggg==';
	var ICON_LINK_COPY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAADjklEQVRIx5WVf0zUdRjHX9/vnfwqDjiO0miwGEbMI5Roqxy5tcqk1KLlWGXDhbjE1sxotlYbzX5t5h8ltKbtXIRaqdncwlX+IWxsNlvuWvyYViJNKOA8RO6Aju+7Pzq4Ozn0ep5/nu/zfL6v7/P5fJ7n+QJAFpv5lQDjURpkhL0s5DpiAAV4zPudpGOLCQUZZHqYxzh1bUQWJ+1aa7XravlLL+hG4WcF6Thxkk1SvAzqzd2r1WrcQB/DACgccHGF1zgGAxwnCTC5SCdHsWIBXa7iI1RwkOYwAAzEBDfhwo43jDQI0Q9j7KOByWhA4LbU3+ljPR0BviMAZPAorGITudiwR33tLFu5AIeo41LEO14o6bSKxdfk4cBJM3pOPsWT8yoRFkfJigdoxQGk4b9Dv0hq00NapqVhvVMl8koaUqkQe0mOB8gAytBqST+pQISYmNUprPcVknRRS4XwkA1gzrmXDJOFgJcR+JRS3Lhxs5it+CYAWMRhyqGGt8kk5oyYuUVjxu6md9Z/gX9mzAL28TynNjFMoxmvtjRj2KOKcwHm5OzjEj5mCbxOpZ1EZZDxI+SSBthws4w3qWO0MXHAGFM9NJAEWNzHR6xjO6NFiQJKjE+0GEIEAOjDD9hAZkKv345H99aYAwRoIwUwZg86EYCTV7hrI02cYBsVNMUEr7eFafL4gntydMZYwwmgnIr/AZiiiM+N8ko2GOm0AKWs5FDMkmtvwc0Bymv5jDT8rOFxvqWHt+JlIAQhJoCpqGm3npQtvMdhdnCWZ9nDz2xkEIbIiQAMASYmlPIko5RE4VNq2EkTXo7Ty3JOUk8/fECenoosupyncQVVJUJcwsdlVCfJowyhAbXKVI7eUJsadLMQ23HSUqzTkgpFwE6nb+V+ammmzNaTKUR3uGtEEjn8iEUyXvbwNxZsYxeO2JN7EBXpTNTUeUdPS/IoU6hNV9SiIXWqUIgVADhojWRg8gO7e3mED+nhPH9wjpFIO/MEB7mbr6jiHOykCwcOMkiNvYWXmRysfik34qwGbiUVPxPUzjiHyGcXJpDKwy5cwDSR2bGcShZhADbWlSV/j5MdfEMwMhuiLBebqaaDKoa7jTnFY+PLlKpXaQS6w713tbjIZ5xndMywtsSLl9GfrhfVq/mlXWstu2gna24GmFgP0LLglmzS5qn0acbwYXWwgd/m64J83uVPggTm0S7q//u5/AtYO9QjPPP28QAAAABJRU5ErkJggg==';
	var ICON_YOUTUBE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAACa0lEQVRIx8WWz0tUURTHP/fNfT6FWaip2I8ZqoUTVJRESmG0qf6FNiG2K9q6Kkuif6ECKfoDJNrVohKpXEXqoiJtU4xGYRFF6TiO735b+GYyGO09Uzvw5V0e95x7zrn3nO8xrCIf9ucskAbqgFogAHzAAinAi7Y6IAQWgRJQBOaBAjC7/eVkaaUzTHkxtS/XaeAacBioN4Z1FQmA78CooD/zanKk4kB+b9tZDHfQcpc2SMpniAvZ129vmne5PZ6XcqHYXDGAZOqsvLDbbXjY1RMhXI+V6JK06S5EGe+yTsoYU/nxd8XQgeexHo9UIuNJtDgHcREcOEj6TDdhYZ4ketUg0eI50eCiQo4Dglpa+y6TfTGOPXkKV5gnif4fEA2epLRzIi4UFXRtUxO7rt+g+dFj7JGjuLk5pPh2IltpLxR+Us+XS2Mux45bt6m/e49U+yHCQiG2nVD4HpLBibgoZ2C5BL7P1o4OmgcGaBwcBN+PZ08yXtLotVK5GANDQ3w9d55wvhjbng0diZqgq7L72/0HTPdfYXHmM6TsUp+LZ1UWVFpDA1liluFhpi/1sZDPY3wfUilIFk/JhuInaEtsFeszOzbO+95eChMTeDUBsnaVu1mVEX6Y59mdY0B7EhJxxSJeEKB/J6Q3VmIm8RXUBFXfwhr4YMY6Kb/5XFhxIO858TSM3wbWDaFA4pkBGNmW1X/JgFTjRbR4eqkxbXzk+v3tOfZxqlS5/iet2TbgItAp2A2qWechrATMGBgFrh7/lB8jzgj6sDGTspa6aCQPAN8Y/Gg8T5UrMxrJFyUWorG86BxzJ75MrdrofgHNGDx6LmdysgAAAABJRU5ErkJggg==';
	var ICON_GOOGLE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEjklEQVRYw7WXX2xTdRTHP+f+bruu7Rjb6NREwCwqf8QNRkQyCIxEZTEgyIuCGl/USKJETTREQcHMNx9EIEETIkZlMYoaCEoi4hYkighLdCywhOEDUeiQbV3bre299/iwOdnWbS1sJ/nlJveenO/3/P9dIU+JVt1RSPHUUiwJo+pHActy8LykpNOdkV9aY/nYk1wVOxbNqtTC4OsYsxAoQQij+AdsZIAk0IXqRUmndkZOtHw1IQSiy+ZXI7IT267JK1SeFxXPfVpj3UfLmy86eROIglBb/TnGPArY3KionpB4rC7ya1s8ZwLRxbNLCQSPYUwVEyHqdQdi8ciU385nhn+yR4LPLaWw8BSWVcFEiedtyQaelQCBwLfjgqt2AlFEkoCHagAoQ+TWEbqu+255Y/Ou0UwNIRCtrd6HMfeP4UkMz92IapOViF+ddvpCCiAa8RvmzC0FZmNZuzCmsh/ceaG8sXl3Tl0QXVY5B7vgNELhKODf+VpbVpVcSXnjds6KhXtR7SlvPPNSzm2Y+iJ0oGf/Xeu8Lj9YOlTLcerLm5q35pryKz4kUGYovuxqTgScRnuautKBKPH9d5JpL/qfmuopuq7WlJ/502ESxAJQR15DAU8IP36BYN0lNGVAQfqS6yYL/PoirLv+ZcGiDswtvSS+nP7JtGOtl8YyULM9UWSb3Ef6YModSZ3cFkzZmWO+EjxKhuZcsG9PMGVj2x4OjeOBpY22UAZoPo5bPv0M2GzjEQZCI3udHinQv3IwNh2I3EDua/qfgg/wZdHpHTiTJUWDRTgR6zpfEcGoqlgoaSCdRSc4cCZFPCUjImoD8YFTOsz1cIfrnw7p9rHXAte0P5KjFWFQsjgiEAWwfA9kuoBrQ0pUXJrSt7G+c/mm8TxJu1KbdqhMO1QNPymHu12PH0YhfmYwx5mjvu3AmwI4CHuTs9iZuIewZEi6fXNanzh87kZDXVsfVytLJWU8lh3fGj4+MIp9ReJorFdtNsaWcjYzFWsgoor+0ZNJ3tf21JFUvuBL347v8Bs2ZfHe/XFL2B7sArs203POKd63uvMhWjPFg+D9IZJ7Q3bhezM+WmHyAV+yLb7Eb3gua/hhx5BdALDqn+X1Mc8Xz9Z3RqznI4Ulxys+fbAoF/Ca+ugzBbb5Hghkmy+e8mHWPl/QsHaHETNq4SmKo+6rwNdpz+loi11MuMmoVkSqCkJ2qFhgpiXWNlusuuDll7ET1SOaw4NDjW+EHxl10MxvWHvYFvPwmK2HJvsvziQGEAqAYkHKr9fz9ywlcPlFsPr+6/3ujl4pP/tOKJ2VwLz9q8WIFbLF/CzIvJsfdw4mVUHw71eQTGlv2tVFP70Vbhl31C5oWBMG+dKIWTkBd3JwpxBq3724aWvoZNYLyXBx1Es0r/+mzsXdM/DLdTPwLRmrc2Y28JyWTVXDmlkWst2IeSw/YO1x1XvWUe9Qy4aDyZvedjM+XhEp9U/ZbIu9UqFEIKzgBxVBHCCpEFO8dsdzP/h9w8EDE/p3PCjvl0llWU2ZsUw/AQURcRTt7XX7us8/eSSvlP0L2RjSQuuvB6QAAAAASUVORK5CYII=';
	var ICON_IQDB = 'data:image/png;base64,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';
	var ICON_SAUCENAO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAL0lEQVQI12NgYGCo/8fgwMQQIcUgY8HAV8DA/oCB+QAIARlALlAQKAVUAFTGwAAA3okJW9pvlV4AAAAASUVORK5CYII=';

	function mewe_is_youtube_video_element(element) {
		/* Возвращает ссылку на youtube.com, или false если это не видео. */
		if (
			element.tagName.toLowerCase() != 'div' ||
			!element.classList.contains('yt-preview')
		) { return false; }
		try {
			var link = element.getAttribute('data-ytlink');
			return link;
		} catch (err) {
			return false;
		}
	}

	function is_image_mewe(url) {
		try {
			// convert:
			//   https://img.mewe.com/api/v2/photo/[^/]*/[0-9]*x[0-9]*/img?static=0
			// to:
			//   https://img.mewe.com/api/v2/photo/[^/]*/full/any_image_name
			var matches = /^(https:\/\/img.mewe.com\/api\/v2\/photo\/([^/]+))\/[0-9]+x[0-9]+\/img.*$/ui.exec(url);

			// Оригинальное имя и расширение картинки неоткуда взять, берём в качестве имени идентификатор картинки из URL
			// FIXME: Расширение не ставим, по идее браузер при сохранении картинки должен сам подставить правильное (в FF работает).
			return matches[1]+'/full/'+matches[2];
		} catch (err) {
			return false;
		}
	}

	function add_menu_item(menu, label, onclick, icon) {
		var menu_item = document.createElement('menuitem');
		menu_item.setAttribute('label', label);
		if (icon) menu_item.setAttribute('icon', icon);
		menu_item.addEventListener('click', onclick);
		menu.appendChild(menu_item);
	}

	function get_bg_image(element) {
		var style = element.currentStyle || window.getComputedStyle(element, false);
		var bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
		return bi;
	}

	function bind_image(menu, event) {
		var element = event.target;
		var tagname = element.tagName.toLowerCase();
		var src;

		if (tagname == 'img') {
			src = element.src
		} else if (tagname == 'div' && element.classList.contains('media-feed_grid-row_image')) {
			// Gallery grid view
			src = element.firstElementChild.src
		} else if (tagname == 'div' && element.classList.contains('post-photo-four_first-element')) {
			// 4 elements view (first big image)
			src = element.firstElementChild.src
		} else if (tagname == 'div' && element.classList.contains('photo') && element.parentNode.classList.contains('post-photo-four_last-elements')) {
			// 4 elements view (last 3 small images, except the last one)
			src = get_bg_image(element)
		} else return

		var image_url = false;
		var url_is_public = false;

		image_url = is_image_mewe(src);

		if (image_url !== false) {
			var encoded_uri = encodeURIComponent(image_url);
			add_menu_item(menu, 'Открыть картинку в полном размере', function(){
				window.open(image_url);
			}, ICON_LINK_OPEN);
			add_menu_item(menu, 'Копировать ссылку на картинку в полном размере', function(){
				GM_setClipboard(image_url);
			}, ICON_LINK_COPY);

			if (url_is_public) {
				add_menu_item(menu, 'Искать картинку в IQDB', function(){
					window.open('https://iqdb.org/?url=' + encoded_uri);
				}, ICON_IQDB);
				add_menu_item(menu, 'Искать картинку в SauceNao', function(){
					window.open('https://saucenao.com/search.php?url=' + encoded_uri);
				}, ICON_SAUCENAO);
				add_menu_item(menu, 'Искать картинку в Google', function(){
					window.open('https://www.google.com/searchbyimage?safe=off&image_url=' + encoded_uri);
				}, ICON_GOOGLE);
			}
		}
	}

	function bind_youtube(menu, event) {
		var element = event.target;
		var video_url = false;
		var hostname = window.location.hostname;

		while (video_url === false && element != document && element !== null) {
			switch (hostname) {
				case "mewe.com":
					video_url = mewe_is_youtube_video_element(element);
					break;
			}
			element = element.parentNode;
		}

		if (video_url !== false) {
			add_menu_item(menu, 'Открыть видео на YouTube', function(){
				window.open(video_url);
			}, ICON_YOUTUBE);
			add_menu_item(menu, 'Копировать ссылку на YouTube', function(){
				GM_setClipboard(video_url);
			}, ICON_LINK_COPY);
		}
	}

	function contextmenu_listener(event) {
		var old_menu_holders = document.getElementsByClassName('kwshrv-menu-holder');
		for (var i = 0; i < old_menu_holders.length; ++i) {
			old_menu_holders[i].classList.remove('kwshrv-menu-holder');
		}
		var menu_container = document.getElementById('kwshrv-menu');
		if (menu_container === null) {
			menu_container = document.createElement('menu');
			menu_container.setAttribute('type', 'context');
			menu_container.setAttribute('class', 'kwshrv-menu');
			menu_container.setAttribute('id', 'kwshrv-menu');
			document.body.appendChild(menu_container);
		}
		while (menu_container.firstChild) { menu_container.removeChild(menu_container.firstChild); }

		bind_youtube(menu_container, event);
		bind_image(menu_container, event);

		if (menu_container.childElementCount > 0) {
			event.target.setAttribute('contextmenu', 'kwshrv-menu');
			event.target.classList.add('kwshrv-menu-holder');
		}
	}

	document.addEventListener('contextmenu', contextmenu_listener);

})();