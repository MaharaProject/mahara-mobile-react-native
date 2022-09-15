import React from 'react';
import { Center, Flex, ScrollView } from 'native-base';
import LogoSvg from 'assets/images/Logo-big';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';

type Props = {
  children: any;
};

function LogoView(props: Props) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        padding: styles.padding.md,
        marginTop: styles.padding.xl,
        paddingBottom: styles.padding.lg
      }}
      style={{ ...generic.view }}
    >
      <Flex alignItems="center">
        <Center w="70%" h={40}>
          <LogoSvg />
        </Center>
      </Flex>
      {props.children}
    </ScrollView>
  );
}

export default LogoView;
