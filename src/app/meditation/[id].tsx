import { useLocalSearchParams, router } from "expo-router";
import { Text, View, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio, AVPlaybackStatus } from "expo-av";
import { useEffect, useState } from "react";

// import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { meditations } from "@/data";
import { SafeAreaView } from "react-native-safe-area-context";

import audio from "@assets/meditations/audio1.mp3";

const formatTime = (milliseconds: number) => {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function MeditationDetails() {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [position, setPosition] = useState(0);
	const [duration, setDuration] = useState(0);
	const { id } = useLocalSearchParams();

	useEffect(() => {
		const initAudio = async () => {
			try {
				await Audio.setAudioModeAsync({
					playsInSilentModeIOS: true,
					staysActiveInBackground: true,
					shouldDuckAndroid: false,
					playThroughEarpieceAndroid: false,
				});
			} catch (error) {
				console.error("Error setting audio mode:", error);
			}
		};

		initAudio();
	}, []);

	useEffect(() => {
		let isMounted = true;

		if (sound && isPlaying) {
			const interval = setInterval(async () => {
				if (isMounted) {
					const status = (await sound.getStatusAsync()) as AVPlaybackStatus;
					if (status.isLoaded) {
						setPosition(status.positionMillis);
						setDuration(status.durationMillis || 0);
					}
				}
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}

		return () => {
			isMounted = false;
		};
	}, [sound, isPlaying]);

	async function playSound() {
		try {
			if (sound) {
				if (isPlaying) {
					await sound.pauseAsync();
					setIsPlaying(false);
				} else {
					await sound.playAsync();
					setIsPlaying(true);
				}
			} else {
				const { sound: newSound } = await Audio.Sound.createAsync(
					require("../../../assets/meditations/audio1.mp3"),
					{ shouldPlay: true },
				);
				const status = (await newSound.getStatusAsync()) as AVPlaybackStatus;
				if (status.isLoaded) {
					setDuration(status.durationMillis || 0);
				}
				setSound(newSound);
				setIsPlaying(true);
			}
		} catch (error) {
			console.error("Error playing sound:", error);
		}
	}

	const handleSliderChange = async (value: number) => {
		if (sound) {
			const newPosition = value * duration;
			await sound.setPositionAsync(newPosition);
			setPosition(newPosition);
		}
	};

	useEffect(() => {
		return () => {
			if (sound) {
				console.log("Unloading Sound");
				sound.unloadAsync();
			}
		};
	}, [sound]);

	const meditation = meditations.find(
		(meditation) => meditation.id === Number(id),
	);

	if (!meditation) return <Text>Meditation not found!</Text>;
	return (
		<SafeAreaView className="bg-orange-400 flex-1 p-2 justify-between">
			<View className="flex-1">
				<View className="flex-1">
					<View className="flex-row justify-between p-10 items-center">
						<AntDesign name="infocirlceo" size={24} color="black" />
						<View className="bg-zinc-800 p-2 rounded-md">
							<Text className="text-zinc-100 font-semibold">
								Today's meditation
							</Text>
						</View>
						<AntDesign
							onPress={() => router.back()}
							name="close"
							size={26}
							color="black"
						/>
					</View>
					<Text className="text-center mt-8 text-3xl font-semibold text-zinc-800">
						{meditation?.title}
					</Text>
				</View>

				<Pressable
					onPress={playSound}
					className="bg-zinc-800 self-center w-24 h-24 aspect-square rounded-full items-center justify-center"
				>
					<FontAwesome6
						name={isPlaying ? "pause" : "play"}
						size={24}
						color="snow"
					/>
				</Pressable>

				<View className="flex-1">
					<View className="p-5 mt-auto gap-5">
						<View className="flex-row justify-between">
							<MaterialIcons name="airplay" size={24} color="#3a3937" />
							<MaterialCommunityIcons
								name="cog-outline"
								size={24}
								color="#3a3937"
							/>
						</View>
						<View>
							<Slider
								style={{ width: "100%", height: 3 }}
								minimumValue={0}
								value={duration > 0 ? position / duration : 0}
								maximumValue={1}
								minimumTrackTintColor="#3a3937"
								maximumTrackTintColor="#3a393755"
								thumbTintColor="#575450"
								onSlidingComplete={handleSliderChange}
							/>
							<View className="flex-row justify-between">
								<Text>{formatTime(position)}</Text>
								<Text>{formatTime(duration)}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
