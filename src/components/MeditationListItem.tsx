import { Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import type { Meditation } from "@/types";

export default function MeditationListItem({
	meditation,
}: { meditation: Meditation }) {
	return (
		<View className="flex-row items-center gap-5">
			<View className="bg-green-700 p-2 rounded-full">
				<FontAwesome name="check" size={16} color="white" />
			</View>
			<View className="p-5 border-2 rounded-2xl border-gray-300 flex-1 py-8">
				<Text className="font-semibold  text-2xl mb-2">{meditation.title}</Text>
				<View className="flex-row items-center gap-1">
					<FontAwesome6 name="clock" size={16} color="#6b7280" />
					<Text className="text-gray-600">{meditation.duration} min</Text>
				</View>
			</View>
		</View>
	);
}
