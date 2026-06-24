export function playEventSound(title) {

  let file = "/sounds/default.mp3";

  if (
    title?.includes("War")
  ) {

    file =
      "/sounds/war.mp3";

  }

  else if (
    title?.includes("Alliance")
  ) {

    file =
      "/sounds/alliance.mp3";

  }

  else if (
    title?.includes("Food")
  ) {

    file =
      "/sounds/famine.mp3";

  }

  else if (
    title?.includes("Unrest")
  ) {

    file =
      "/sounds/protest.mp3";

  }

  else if (
    title?.includes("Economic")
  ) {

    file =
      "/sounds/economy.mp3";

  }

  else if (
    title?.includes("Disease")
  ) {

    file =
      "/sounds/plague.mp3";

  }

  else if (
    title?.includes("Revolution")
  ) {

    file =
      "/sounds/revolution.mp3";

  }

  else if (
    title?.includes("Trade")
  ) {

    file =
      "/sounds/trade.mp3";

  }

  else if (
    title?.includes("Crisis")
  ) {

    file =
      "/sounds/crisis.mp3";

  }

  const audio =
    new Audio(file);

  audio.volume = 1;

  audio.play()

    .then(() => {

    })

    .catch(() => {

    });

}