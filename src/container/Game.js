import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Animated,
  ImageBackground,
  StatusBar,
  Image,
  Easing,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const icons = {
  rock:
    'data:image/png;base64,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',
  paper:
    'data:image/png;base64,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',
  scissors:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAATeElEQVR4nOWdeZQc1XXGf6+q1+nZNBJaEVhCCAEBGWkEdrABYYycIDACB3DANhgwOUmwsTAHxxxII4KBYxtiOXEMMRgTggEDxmxOIsQWgbA0UljMImEsMEhC0kizT/d0d9XLH7d6ep/pqq4ejeTvnD493VNv6frq3Xfffffepxj/mAgcBswD5jp/TwVizmuC8w4wAHQ57wPAdmCz83ob2ATsHsO+u4ba2x0og6nAp4FTgM8Cs3yufzuwBnga+G/gfZ/rrwnjhZDDgS8DZwOHFv2vB3nCNyFP+WbgA3KjIDsioHDExICZyKiah4ysuUBLUf2bgYeA/3Dq/5PFJODrwHpA5726gceAbwBH4+9Do5w6r3Da6C5q+7fA5U7f/mRwEPAjYJDcjegCbkdElTmGfTGBE4A7nD5k+zMIrERG2H6LQ4E7gRTyoy3gCeAcILIX+5VFBOnLk0jfNDAE/DtwyF7sl++IATcDaXJEPA4s2JudGgVHAveQ63Ma+CHQvDc75QfOB7aR+1H72tM2B/gpOWK2AufVs8F6aVmzEPG02Pn8IvC3wGt+NqI74vNALQN9GKBR6k208Yhqv/ZdP9sB5gM/Bv7c+bwauJg6qMz1IOTzwM8Q9XMPsAKZxG2/GtAd8QYUP0JzIWAU/TsD/BtRvqWOjKf8ahO5V18CvgdMRtTxS4Ff+thGyY+pBWFEzv4KIeNRZCL/IX6S8c7KMIqn0HyV8v0PAJeT4GH94IN+amwamVeOAH6NrGceAG4DQn414hch05DV79cReXsFcBYyQvxFz56r0ZxYxZVLOeStv/G9fTG9LAOWk/utLwBT/KjcD0LmIGS0A1uATyGjQvtQdwH0s3F5+qsuoJf73YdszcjI+DTwHnAcMk/OrrXiWgk5Cnje6UgH0rH1tXaqIlqMI3G3ip6tO+IH1as7wDpgIbAW0R5fAo6ppcJaCDkRGRnTgf9BNKpdtXRmVNi2e7GgmVqHnuRjD3AqsAoRW88hI8cTvBJyNDJpNwOPAGcA/V47UTWUh/4aviouldAPLAV+gdyTJ/C48A14KDMHGRGtTgcuoEotSr8cbyagFqJoxVIf8t68jeqccywPfRiPSCH3QiGLxyeB44E/uKnELSGTgaeQobkauIgqyNAb49OxuAXFuaCDaMDQMPvNHXpD/GYWsFKpuG+q8V6EjWwjTACWIGLseOCjaitwM5zDCOuHIpPZmYjxbUTojfEjsOlAcQEQLPr3FDS3sYGHHA1qf0Aa+CtEyZmNiPaq1yluCPkeOdX2NKqYM/Sz8Qg2jyLrlJGwjCb+0UVfxjv6gL8kpxLfXG3BaglZCvw9wv75QGdVpRq5hNIdwEq4Ur8an1zltfsCdiHm/BSyeDyzmkLVEHIQ8HNksroK0bmrg+Lsqq+FKCmWurh+X8B64B+Qe3cXVfgHjEaIAu4G2hBZuNJlh+a6vL6qp2gfw23IdvEEZGdyRIxGyBfJLfguxr05xJ21VXGqXnNLk8s2xjs08FVEzJ8CnDvSxSMR0oxM5ABX481Q+KbL68OEE0s8tDPesRsRXQD/TKnnyzBGIuSfELPIi4jYcg+tnnZdRu2XYgtkDlmL+J1V1CgrEXIossOXcd69WW6VB0JgqX4j7tv+wjiCjdxLC7FYl93KrkTItxEXmZ9Ry7brwut+h3gKukELCU7y3Ob4xiuIxhpApoESlCNkJmKTscjNIZ6gFBrNag9F91exBfBdRPJcCBxc/M9yhFyNLPXvB96puXlvYmuZ1vGxsNLuDbyL7MMHkV3HAhT/6AMQFc0GbvKleUOvwv0cNJWNHOtL++MT30XuyaWId/8wigk5D4gCvwHe8KNltSC+DXjLQ9FlfrQ/TvE74L+Qe13g51VMyJed95/73IFVrktozvK5D+MN9zjvX8r/Mp+QwxFrbg+y4+UfFF7mkTl63Yojfe3H+MKjiPf9cUioBFBISHZ03A8kfG06EX0esRS7g9L7s7aVBB52/j4/+2U+IVnL7H/63bL61NV9wMvuC+r9eR4BuNd5/0L2iywhM5DVeQ/iylIPeBFbC/Vvb/A7pG08YQ3Qi0wXMyBHyGec9+eRBaH/sD0RAqZ1us89GU/IAP/r/H0S5AjJeqk/W7emB1iHjEC32J/nEcjd88WQI+Rk5/2ZerWqFscziBOZW5ygO+L7c8xf1rR0Mgghk5Bt2h7g9bo2rT2JLRO1323t5uM1xCliFtAWIKcDb6IODtKFMFd5nKKW4XVPpgj62XiERmMhyj4Abeyi396gFseTftTtETYSmr0QmGtQSEhdoRZduwlxjXEHXfvWrn453qzXx2+jiU6UvQb4FcpeQxOdekP81r28dZy994cVj5D6Q/GME2zjBhHCyVPJJQhwBf3yjVMIpJ9Bgm2KEUPzTSKJJfrV+GI1P76zpPxrN00gmZ6DiY0O/V61f9uLcjIShgkxyHmGbPa5kfKwPZnjAY+rdmUpgukHKE9GPo4gzf0FLXasOE6vjz9NamgXhr0ObXdAslN3xB/XG1fM99Sf8iggJOvi/6GPDVSG0qvwEuKmWIrpwTlcm8dVGXEFsFhvuH4JgF5//cVgr0HxGQqTGQSApdj2y3p9/Atla3GP7L2fYgBZ2dnrU+UjQrXHO/G2LdxKmqNdl9K6WjKy139er1txIkrfzsjO6BEU9/o0Uvqc96Z8Quof35GF9mCOl4LuA2E0012WmI1h30J1KT7C2PaNrvtUirKE9FW42H94M8eDUp9zXcZQE9y1QRNiEq8Wfjj3FRDS6HwYuxHSxwuI+bn+0C5D8TVRly0EiSZqNYAOE7JXYjLU4nhSd8RfImeyGYa2bKzBNNZQGjttY6czaEuDBm2X0QWUQpkKwzQxIiaBaIhALAQqS4Su1vs+C/dBm1odj09ZKgLIyGhDRor/ceWVsYo8QjIDKVLdCaxkyp29QGt0RmNlbKyhNOmeJMpQhNoaCLVE84gZ1xieNgLIcGlzvhw7QgyexuYmbdnYGRtlKqJTmlwn+9C2xk5ZpPuSZPqHhr8b6hwgM5AiOq0ZZYx7j6ISQiA3l4wNjmGj7qBLmWqCaXqXnMoEI2gSiIWwkikS2/vQlog2K5Emsa2Phhkt4yeZYXkME2KQI2Rsc0Ft5BKlaPXzTpmRENFpzQViykqmSPf66yJQBxQQssP5cOBYta43xL+G5ifU4bk1I0FCrYUJ6lI9e9OYWxWy936HQc6O4jbayRPqSUYWweZCzdVOZbDT4zocPmvgfTufkMMqXOwbxoIMkDlFmYUTuc6M6zD4YYt7gDEiZKzIyEIZCp03KLRtQ6ARorMh2AZmFOwUpPdAYguku8vVApGDIDIDzJh8tpMwtFXKaN9ILkvIPGmxDmmVxpgM0CUjQjV+DKafJWpZMVqPhz2roT/fBdmEqWdDuFzumo9DuhO2P0AB695QsAViIPFv7yNalntr6igYezIg3ZtE67znSoHRfGh5MgCUAWFnXrWdcoHGCmQ4CE4Cw0k5794nMx/zES1rC9CVFbQFrih+Qa+//ptjTQZokp2FG4tmOIDSo5jqUpILIZNwAoetPrBHyBxiJcGWFYOdTtQiVbI+cash5wbkOyF6ffxGlL6VMV6SJbb15p5yB4GmiIgjq4L6aydgUMRVqishC0ttQ9+rlRvqewW0xk5bpBPpWkwBBT5x2Yqy5vAT8SHVt+64fjFqOAx4TKAtm+TOPjKDpaHxwVhYbnrnk6VPvZWEnU+ClcRKiFEz1e0sJHvWwWCZILKBTdDbAUCqa7CWbgeQlIgah5CszWIbMrkfhqQTeqGWVkBfTc0jQ5PuTmAl8yZNU2GGCs0s2raxhjJYgym0XV5yJHf2EZ3eAsmtsPUeiM2FQDNkemBwM1hJtG2T2N4DGlLdgwQaQpjRIOz6DUReF20LIPm+1ANkBoZI9yUJTWjw+ls/jczdb+IEx+b/ukeQ4PbzqYEQ/c7KMD17Sszq7irRJHb0DRsL8+Fl/swMphjc1k3kgCaMYKJEFNmpDIMfducI1TC4rYfIAY0EmyKQ/FBeeUh1Jxja3V+rTnqB8/5Q9ot8Qu5GCDkXyV7jzQDUt2cipXmx3EEpgk0RrGTa04JOGYBWBZqWNZhm4I9dBGIhzEgQZRpoy8JKpMkMlMkAojXJnX2kuhIEGkMYIRM02CmLTP8QdiZv5HpbjkRgOErsvuyX+YRsRrLXLAJOBx701IztKW1gCQKxELHwBJK7+srfsLJQBJvChCbGsIfSJD7qLXyCtSbTP1R25FWCnc6Q6sq46nuVOBNJk7iWPJ+4Yu0gG/f2Fe/tRHrwaXGpAgbRac2EWsvvqirAjAYItkSJTGmicVYbkSlNGAGDQCxMdGpLiQll9Dbd6jQKI6C8WC+zEWv35n9Z3NtsONtfAH/moREcrz4fvSAV4UmNRKY0l6gJGrCHLIJNYYJNkZKbH4iFiM1slXlglGlXGYpwWwONB08gOrVZRNQoMKNBGma2EGxpcJv8/yjgc8jBMQ8U9Lnowk7keIbLkfQaF+AJ6j7QK7yVLY9gUxhlNJP4qA/y5gZtaxLbemg4sBUjVCotVcAkMqWJ8MQGMoMprEQaO2OL3DfACAYINAQxYyGUs48SaAwTaAwNzy92ypJ9faVRpokZDhCIhTDCTnvu5cF3kEfkDopOjSv33ByIZBswkVAr19kcnHiOzUjSLl8hu4C96CLDngqYxGa2uhZRvkCzWC2KP1fl1XOQw8cySAKarfn/LNf7D5G5xKRCgpTRoNrjnWi+5aXsaDCjQaLTC3cFAXTGIrmjj7pHVJSDNtw0eg1yb++miAyonA3oZoTBryDGL9dQi+J3oXncS9nRYEaDRCaX+qZlBlMM7a5p5eyxQ1X7tC1AEgWkgVvKXVCJkHeBf0HmmDtGuG5kWMFLqVM++GBTmFBbQ8n3qe5BrKHazK+uoVW5zZRiGMg9NZHTI7ZUuqgSrkOG1LFIKiHXUJ+4ZgeaS7yUrQbhtgYCjeHCLzUM7RpgDEVXGib/sYrrLgY+iZhIbqh00UiE9MHwPHALRVlrqoVaFH8M0dzqAEVkchNGsFBFtZJp0r3VL/5qxNuq/bLRhuQkctmVvsEIkQajiaL7ETv9JCRnoDcjWjB2BXUKCFKGkFLcs6E9AxWNjb5i9ARt2Zy9E5FDDEY8s6qaueEiRFc+A7FxuYaaf9UAhnEhoij4DjMalMVfHnTGHiN/LPXUKBdciZiiuoDLRqutGkI+QOYQjYiuT1ZRpgRqwXVr8SspWhmE22IlLqOp7iR1nku2suXwkWL7jwVudDpxEVUEvFarPT2BaAZBxDJ5QJXlijDtBlR9jkRSAYNgS/EoscgM1lHj0qwc4fyTyYh4CgE/QE52GxVu1NmrkdOUP4acIeI6SEW1X5bG4gy8ZZgbFaHWKMoonEzSvXXzWtxBKPavFf7XhNyjg5BkPt+ptlI3hKQQWbgJSXT2KHKmiCuoY+MfEeQk6pA1QplGiRpsDaYKbF8+Yrmaf1W5MO0QsuG0EFnPnYWLfTW3C75dyNkhHyGxHXd7qAM1P76TIKdQB1JKJndbYyV8F1u/Vu3x+8p8byBmp1OR9cZnyflOVwUvK/B3nQa7kQSOv8TD8dtOgP7JwAiuHe5hRgMlexqZpK+EvINZdqEcQpK/nYusM06jwmp8JHg1jb6OnHnbgwzJx/AQX6La452YnISu1amioFYC0cIdZHvIN217G5a5RB0TLzaVNCHHQZ2H3JPTgP/z0kAttuoXEBeWrcjQfA7RLFxBHRPvpp8l+HjIr1lEiJX0hZA/YLFYHXdt8VM/BXHhOQUR5SchmeI8wQ8ntllIDtq5yJrlPDykCdQaxYb4lchapaZ9eWsow+AHXQXfNc6eVKKBVd85VhPir8vkQVmE7PjNQo7HWwL83lsjAj92c7YAJyAq8UxkpCzHJdlKoVV7/PsYxglIomHPMIKlP8tjOEIfWi2nnVOLyFDICvxFhIyXgE9QIxnZiv1CCNlHucKp9zEkbfnukQqVg+64PQjbL0eMm6Od8FYW/Vt2D8caAjTMaC0RZSMggeYuVPBG1X5N8ekOWbve6cgK/AfIOsMXzaEefrenkzu3qgu4Ho8H3Os34iES6ougz0Fkc+kGSAX0v7cHnec7FZ3WIvHrlWEB60HdT1D/oox4yh5w/33EUtGDmNQfxkfUyxH6YMTkforzeS1ymMkrXivUz8YjNNGOYg6a2cjIqXh0UGJ77wJtWcOrxFBbbFOgIZQf9j2Aoh/NFrR6i4BeW0Z7yuIY4MeIWAKx2l6CzJn7FM5DtDCNWHrvpPpzDccD5iKH2mSQ3/ABcornPo1m4FZExmaJuQ+Pfl9jhKOQg5ezRKQQUTW2sfx1xiHI/vwQjo8bYoA7F1wnfKkHskdHPIX0TSMJcn5CFQdC7ss4EDHlDyI/WiNmmJ8iE/dYJsQJOG3e6fQh258B5Hi7GWPYl72OicDfIUn6dd6rF9l/WQ58HH/WSlkYyAS93Gmjt6jtrPLR5mObrjBeMoDMRVTKsxFvyXz0ISb/zYjH3ybEma/feXWTy/XViHiUNzqvmU7d85BgpLmU7uO8iZjL78WPM7f2Q0xGNJnbEcuy9vm1DQm1+BpC2LjCeBkhI6GN0qd8KhBDnvbsiIDciOlz/t6BjKj8V6GRa5zh/wGjVSYijJsNpwAAAABJRU5ErkJggg==',
};

export default function Profile() {
  // use navigation Hook to get the navigation object
  const navigation = useNavigation();

  // use state Hook to define state for component
  const [playersChoice, setPlayersChoice] = useState('');
  const [computersChoice, setComputersChoice] = useState('');
  const [gameStatus, setGameStatus] = useState('');
  const [countdown, setCountdown] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);

  const [timesPlayed, setTimesPlayed] = useState(0);
  const [rockCount, setRockCount] = useState(0);
  const [paperCount, setPaperCount] = useState(0);
  const [scissorCount, setScissorCount] = useState(0);

  const [timesWon, setTimesWon] = useState(0);
  const [timesLost, setTimesLost] = useState(0);
  const [timesTied, setTimesTied] = useState(0);

  const [iconSize, setIconSize] = useState(new Animated.Value(0));
  const [computerIcon, setComputerIcon] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!!playersChoice && !computersChoice && countdown <= 4) {
      console.log('countdown should be shown');

      if (countdown <= 1) {
        //do computers turn and set countdown back to 0
        setTimeout(() => {
          cpuTurn();
          setCountdown(4);
        }, 800);
      } else {
        setTimeout(() => {
          setCountdown(prev => prev - 1);
        }, 800);
      }
    }

    if (!!playersChoice && !!computersChoice) {
      if (!gameStatus) {
        determineWinner();
        recordStatistics();
      } else {
        //show modal
        setTimeout(() => {
          setModalVisible(true);
        }, 2000);
      }
    }
  }, [playersChoice, computersChoice, countdown, gameStatus]);

  const cpuTurn = () => {
    const possibilities = {
      1: 'rock',
      2: 'paper',
      3: 'scissors',
    };
    const calc = Math.floor(Math.random() * 3 + 1);
    setComputersChoice(possibilities[calc]);
    Animated.timing(computerIcon, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const reset = () => {
    iconSize.setValue(0);
    computerIcon.setValue(0);
    setPlayersChoice('');
    setComputersChoice('');
    setGameStatus('');
    setModalVisible(false);
  };

  const determineWinner = () => {
    if (playersChoice === computersChoice) {
      setGameStatus("It's a tie!");
      setTimesTied(timesTied => timesTied + 1);
    } else {
      if (playersChoice === 'rock' && computersChoice === 'paper') {
        //computer won
        setGameStatus('You lost!');
        setTimesLost(timesLost => timesLost + 1);
      }
      if (playersChoice === 'rock' && computersChoice === 'scissors') {
        //player won
        setGameStatus('You won!');
        setTimesWon(timesWon => timesWon + 1);
      }
      if (playersChoice === 'paper' && computersChoice === 'rock') {
        //player won
        setGameStatus('You won!');
        setTimesWon(timesWon => timesWon + 1);
      }
      if (playersChoice === 'paper' && computersChoice === 'scissors') {
        //computer won
        setGameStatus('You lost!');
        setTimesLost(timesLost => timesLost + 1);
      }
      if (playersChoice === 'scissors' && computersChoice === 'rock') {
        //computer won
        setGameStatus('You lost!');
        setTimesLost(timesLost => timesLost + 1);
      }
      if (playersChoice === 'scissors' && computersChoice === 'paper') {
        //player won
        setGameStatus('You won!');
        setTimesWon(timesWon => timesWon + 1);
      }
    }
  };

  const recordStatistics = () => {
    if (playersChoice === 'rock') setRockCount(rockCount => rockCount + 1);
    if (playersChoice === 'paper') setPaperCount(paperCount => paperCount + 1);
    if (playersChoice === 'scissors')
      setScissorCount(scissorCount => scissorCount + 1);
    setTimesPlayed(timesPlayed => timesPlayed + 1);
  };

  const doRPS = selection => {
    // hide other icons
    setPlayersChoice(selection);
    //set animation values
    Animated.timing(iconSize, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              gameStatus === 'You won!'
                ? 'green'
                : gameStatus === 'You lost!'
                ? 'red'
                : 'yellow',
          }}>
          <Text style={{fontSize: 100, fontWeight: '900'}}>{gameStatus}</Text>

          <Button title="Play again" onPress={() => reset()} />
        </View>
      </Modal>

      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/bg.jpg')}
        style={{width: '100%', height: '100%'}}>
        {countdown <= 3 && (
          <View style={{position: 'absolute', alignSelf: 'center', top: 100}}>
            <Text style={{fontSize: 100, fontWeight: '900'}}>{countdown}</Text>
          </View>
        )}

        {!!computersChoice && (
          <Animated.View
            style={{
              transform: [
                {
                  translateY: computerIcon.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-150, 110],
                  }),
                },
              ],
            }}>
            <Animated.Image
              style={{
                position: 'absolute',
                alignSelf: 'center',
                height: 200,
                width: 200,
                borderRadius: 500,
                backgroundColor: '#ffffff',
                transform: [{rotate: '180deg'}],
              }}
              source={{
                uri: icons[computersChoice],
              }}
            />
          </Animated.View>
        )}

        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
            }}>
            {(playersChoice === '' || playersChoice === 'rock') && (
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 0,
                  width: 100,
                  height: 100,
                  transform: [
                    {
                      translateX: iconSize.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 130],
                      }),
                    },
                    {
                      scaleX: iconSize.interpolate({
                        inputRange: [1, 2],
                        outputRange: [2, 3],
                      }),
                    },
                    {
                      scaleY: iconSize.interpolate({
                        inputRange: [1, 2],
                        outputRange: [2, 3],
                      }),
                    },
                    {perspective: 1000},
                  ],
                }}>
                <TouchableOpacity
                  disabled={!!playersChoice}
                  onPress={() => !playersChoice && doRPS('rock')}>
                  <Animated.Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 500,
                      backgroundColor: '#ffffff',
                    }}
                    source={{
                      uri: icons.rock,
                    }}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}

            {(playersChoice === '' || playersChoice === 'paper') && (
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 135,
                  top: 0,
                  width: 100,
                  height: 100,
                  transform: [
                    {
                      translateX: iconSize.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0],
                      }),
                    },
                    {
                      scaleX: iconSize.interpolate({
                        inputRange: [1, 2],
                        outputRange: [2, 3],
                      }),
                    },
                    {
                      scaleY: iconSize.interpolate({
                        inputRange: [1, 2],
                        outputRange: [2, 3],
                      }),
                    },
                    {perspective: 1000},
                  ],
                }}>
                <TouchableOpacity
                  disabled={!!playersChoice}
                  onPress={() => !playersChoice && doRPS('paper')}>
                  <Animated.Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 500,
                      backgroundColor: '#ffffff',
                    }}
                    source={{
                      uri: icons.paper,
                    }}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
            {(playersChoice === '' || playersChoice === 'scissors') && (
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 390,
                  top: 0,
                  width: 100,
                  height: 100,
                  transform: [
                    {
                      scaleX: iconSize.interpolate({
                        inputRange: [1, 2],
                        outputRange: [2, 3],
                      }),
                    },
                    {
                      scaleY: iconSize.interpolate({
                        inputRange: [1, 2],
                        outputRange: [2, 3],
                      }),
                    },
                    {
                      translateX: iconSize.interpolate({
                        inputRange: [128, 129],
                        outputRange: [0, 1],
                      }),
                    },
                    {perspective: 1000},
                  ],
                }}>
                <TouchableOpacity
                  disabled={!!playersChoice}
                  onPress={() => !playersChoice && doRPS('scissors')}>
                  <Animated.Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 500,
                      backgroundColor: '#ffffff',
                    }}
                    source={{
                      uri: icons.scissors,
                    }}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>

          <View
            style={{position: 'absolute', bottom: 50, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                textDecorationLine: 'underline',
                marginBottom: 5,
              }}>
              Statistics
            </Text>
            <Text>Times Played: {timesPlayed}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <View>
                <Text>Rock Counter: {rockCount}</Text>
                <Text>Paper Counter: {paperCount}</Text>
                <Text>Scissor Counter: {scissorCount}</Text>
              </View>
              <View style={{marginLeft: 10}}>
                <Text>Times Won: {timesWon}</Text>
                <Text>Times Lost: {timesLost}</Text>
                <Text>Times Tied: {timesTied}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
