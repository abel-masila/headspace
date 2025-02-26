import { useLocalSearchParams, router } from "expo-router";
import { Text, View, Pressable } from "react-native";
import Slider from "@react-native-community/slider";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { meditations } from "@/data";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MeditationDetails() {
	const { id } = useLocalSearchParams();

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

				<Pressable className="bg-zinc-800  self-center w-24 h-24 aspect-square  rounded-full items-center justify-center">
					<FontAwesome6 name="play" size={24} color="snow" />
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
								style={{ width: "100%", height: 40 }}
								minimumValue={0}
								value={0.5}
								maximumValue={1}
								minimumTrackTintColor="#3a3937"
								maximumTrackTintColor="#3a393755"
								thumbTintColor="#575450"
								onSlidingComplete={val=>console.log(val)}
							/>
							<View className="flex-row justify-between">
								<Text>03:33</Text>
								<Text>11:33</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
