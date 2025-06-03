        function updateAllGreetings() {
            // class="greeting-message" を持つ全ての要素を取得
            // getElementsByClassName は HTMLCollection (配列のようなもの) を返す
            const greetingElements = document.getElementsByClassName('greeting-message');

            const now = new Date(); // 現在の時刻を取得 (訪問者のローカル時間)
            const hour = now.getHours(); // 現在の「時」を取得 (0-23)

            let message = '';

            // 4時から17時まで（4時00分00秒～16時59分59秒）
            if (hour >= 4 && hour < 17) {
                message = 'こんにちは。';
            }
            // 17時から4時まで（17時00分00秒～3時59分59秒）
            else {
                message = 'こんばんは。';
            }

            // 取得した全ての要素をループしてメッセージを挿入
            for (let i = 0; i < greetingElements.length; i++) {
                greetingElements[i].textContent = message;
            }
        }

        // ページが読み込まれたときに一度実行
        document.addEventListener('DOMContentLoaded', updateAllGreetings);

        // （オプション）1分ごとに更新したい場合
        // setInterval(updateAllGreetings, 60 * 1000);