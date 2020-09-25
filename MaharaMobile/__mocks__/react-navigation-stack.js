import View from "../native-base-theme/components/View";

jest.mock('react-navigation-stack', () => { return {BaseButton: ()=>{jest.doMock()}} });