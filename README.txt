Netlify SRI 測試
================
1. 前往 https://app.netlify.com/drop
2. 拖曳整個 netlify-sri-demo 資料夾（非個別檔案）
3. 開啟網站首頁：正確 Hash，應顯示綠色的驗證成功。
4. 開啟 /fail.html：錯誤 Hash，應顯示紅色的驗證失敗。
5. 按 F12 → Console，可以看到錯誤 Hash 的瀏覽器錯誤訊息。

注意：若拿到 ZIP，請先解壓縮，再拖曳資料夾上傳。

本範例 app.js 的有效 SRI：
sha384-uVhMLg8fpRPU8G8uClgn1uWt3qMxc5CKsJKJBn9mWgM6LGLkzUbwNlgQcD7klBMa

本範例故意錯誤的 SRI：
sha384-EFfezzo8oBH0bxOErMsdSWwT7ZKyVsHkpAm1XYaO4iVZ6NiwBi4PUHVJOImSZayU

自行產生 SRI（Node.js）：
node -e "const fs=require('fs'),c=require('crypto');console.log('sha384-'+c.createHash('sha384').update(fs.readFileSync('app.js')).digest('base64'))"

請不要更改 app.js 後仍使用舊 Hash，否則正確頁面也會變成驗證失敗。
