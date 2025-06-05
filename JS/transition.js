// JS/transition.js

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('pageTransitionOverlay');
    const allLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])'); // 外部リンク、アンカーリンク、メール、電話以外のすべての内部リンク

    // ページ読み込み時にフェードインアニメーションを開始
    if (overlay) {
        // bodyにクラスを追加して、CSSでフェードインをトリガー
        document.body.classList.add('fade-in-active'); 
        
        // アニメーション完了後にクラスとオーバーレイを削除
        overlay.addEventListener('transitionend', function handler() {
            document.body.classList.remove('fade-in-active');
            // 必要であれば、overlayをDOMから削除することもできるが、ここでは単に非表示に留める
            overlay.removeEventListener('transitionend', handler); // イベントリスナーを一度だけ実行
        });
    }

    // すべての内部リンクにクリックイベントリスナーを追加
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href'); // リンクのhref属性を取得

            // 同じページ内のリンク（アンカーリンク）ではない、かつ外部リンクでもない場合
            if (href && !href.startsWith('#') && !this.hasAttribute('target')) {
                e.preventDefault(); // デフォルトのページ遷移をキャンセル

                if (overlay) {
                    overlay.classList.add('fade-out'); // フェードアウトクラスを追加

                    // アニメーション完了後にページ遷移
                    overlay.addEventListener('transitionend', function handler() {
                        window.location.href = href; // 新しいページに遷移
                        overlay.removeEventListener('transitionend', handler); // イベントリスナーを一度だけ実行
                    });
                } else {
                    // オーバーレイが見つからない場合は、そのまま遷移
                    window.location.href = href;
                }
            }
        });
    });
});