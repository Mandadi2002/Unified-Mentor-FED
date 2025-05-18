const artData = {
    art1: {
      src: "art1.jpg",
      caption: "Sunset Overdrive - A vivid depiction of nature's calm."
    },
    art2: {
      src: "art2.jpg",
      caption: "Dreamscape - Imagination meets color and form."
    },
    art3: {
      src: "art3.jpg",
      caption: "The Mona Lisa, painted by Leonardo da Vinci between 1503 and 1519, is one of the most famous artworks in the world."
    },
    art4: {
      src: "art4.jpg",
      caption: "Landscape painting is the depiction of natural scenery such as mountains, valleys, rivers, and forests, where the main subject is a wide view arranged into a coherent composition."
    },
    art5: {
      src: "art5.jpg",
      caption: "Landscape painting is the depiction of natural scenery such as mountains, valleys, rivers, and forests, where the main subject is a wide view arranged into a coherent composition."
    },
      art6: {
      src: "art6.jpg",
      caption: "Landscape painting is the depiction of natural scenery such as mountains, valleys, rivers, and forests, where the main subject is a wide view arranged into a coherent composition."
    },
      art7: {
      src: "art7.jpg",
      caption: "Landscape painting is the depiction of natural scenery such as mountains, valleys, rivers, and forests, where the main subject is a wide view arranged into a coherent composition."
    },
      art8: {
      src: "art8.jpg",
      caption: "Landscape painting is the depiction of natural scenery such as mountains, valleys, rivers, and forests, where the main subject is a wide view arranged into a coherent composition."
    },
     art9: {
      src: "art9.jpg",
      caption: "Landscape painting is the depiction of natural scenery such as mountains, valleys, rivers, and forests, where the main subject is a wide view arranged into a coherent composition."
    },
     art10: {
      src: "art10.jpg",
      caption: "Landscape painting is the depiction of natural scenery such as mountains, valleys, rivers, and forests, where the main subject is a wide view arranged into a coherent composition."
    },
     art11: {
      src: "art11.jpg",
      caption: "Landscape painting is the depiction of natural scenery such as mountains, valleys, rivers, and forests, where the main subject is a wide view arranged into a coherent composition."
    },
  };
  
  function openModal(id) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const caption = document.getElementById("caption");
  
    modal.style.display = "block";
    modalImg.src = artData[id].src;
    caption.innerText = artData[id].caption;
  }
  
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }
  