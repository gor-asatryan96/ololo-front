import { useEffect } from 'react';
import useLibSound from 'use-sound';
import { sounds } from '../../assets/sounds';
import { GAME_RESULTS } from '../../constants/game/ids';
import { useSound } from '../../context/SoundProvider';

const { WIN, LOSE } = GAME_RESULTS;

const useGamingCardSounds = (
  isDrawing, result, gameId, isYouWinBannerShow,
) => {
  const { isSoundActive } = useSound();
  const animationSound = useLibSound(sounds.animation, { loop: true });
  const losingSound = useLibSound(sounds.losing);
  const opponentJoinedSound = useLibSound(sounds.opponentJoined);
  const tournamentWinSound = useLibSound(sounds.tournamentWin);
  const winSound = useLibSound(sounds.win);

  const soundsRefs = [ animationSound, losingSound,
    opponentJoinedSound, tournamentWinSound, winSound ];

  useEffect(() => {
    if (!isSoundActive) {
      soundsRefs.forEach((item) => {
        if (item) {
          item[1].stop();
        }
      });
    }
  }, [ isSoundActive ]);

  const toggleAnimationSound = (isActive) => {
    if (isSoundActive) {
      if (isActive) {
        animationSound[0]();
      } else {
        animationSound[1].stop();
      }
    }
  };

  const startResultSound = () => {
    if (isSoundActive) {
      if (result === WIN) {
        tournamentWinSound[0]();
      } else if (result === LOSE) {
        losingSound[0]();
      }
    }
  };

  const startOpponentJoinSound = () => {
    if (isSoundActive) {
      opponentJoinedSound[0]();
    }
  };

  useEffect(() => {
    toggleAnimationSound(isDrawing);
  }, [ isDrawing ]);

  useEffect(() => {
    if (result && isYouWinBannerShow) {
      startResultSound(result);
    }
  }, [ result, isYouWinBannerShow ]);

  useEffect(() => {
    if (gameId) {
      startOpponentJoinSound(result);
    }
  }, [ gameId ]);
};

export default useGamingCardSounds;
