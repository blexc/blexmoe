// Show iframes if window is large enough, otherwise display links with text
function updateLinks() {
  var html;
  // body.max-width + block.padding * 2 =
  // 700            + 30 =
  // 730
  if (window.innerWidth >= 730) {
      html = `
      <iframe src="https://store.steampowered.com/widget/1987690/" frameborder="0" width="646" height="190"></iframe>
      <br>
      <iframe frameborder="0" src="https://itch.io/embed/1013102" width="552" height="167"><a href="https://blexchapman.itch.io/super-sushi-roll">Super Sushi Roll by blex chapman</a></iframe>
      `;
  }
  else {
    html = `
      <a src="https://store.steampowered.com/widget/1987690/">Steam Link</a>
      <br>
      <a src="https://blexchapman.itch.io/super-sushi-roll">Itch.io Link</a>
    `;
  }
  document.getElementById("links").innerHTML = html;
}

updateLinks();
window.addEventListener('resize', updateLinks);
