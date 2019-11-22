import { StyleSheet } from "react-native";
import { styles as variables } from '../../assets/styles/variables'

export const styles = StyleSheet.create({
    uploadItem: {
        flexDirection: 'row',
        padding: 3,
        marginVertical: 3,
        height: 120,
    },
    todoCard: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'column',
        width: '30%', // of width of parent
        justifyContent: 'space-evenly',
        paddingLeft: 10, // left and right
        height: 80
    },
    textContainer: {
        paddingLeft: 10,
        width: '50%'
    },
    imageContainer: {
        width: '20%',
    },
    thumbnail: {
        height: '100%',
        width: '100%',
    },
    button: {
        width: '100%',
        height: '50%'
    },
    date: {
        fontSize: 20
    },
    title: {
        color: variables.colors.primary,
        paddingVertical: 5,
        fontSize: 16
    },
    // doneTitle: {
    //     textDecorationLine: 'line-through',
    //     color: variables.colors.primary,
    //     paddingVertical: 5,
    //     fontSize: 16
    // }
})

