function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得している。
      const list = document.getElementById("list");
      //最後にリセットを入力フォームをリセットするために必要な記述。
      const formText = document.getElementById("content");
      //以下はHTMLに描画するHTMLを記述している。</div>の重量タグまで。
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    }; 
    e.preventDefault();
  });
}
window.addEventListener("load", memo);