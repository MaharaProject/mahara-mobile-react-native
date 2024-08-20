import React from 'react';
import { Box, Divider, HStack, VStack } from '@gluestack-ui/themed-native-base';
import { Trans, t } from '@lingui/macro';
import { ScrollView } from 'react-native';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';
import LinkText from 'components/UI/CustomText/LinkText';
import MediumText from 'components/UI/CustomText/MediumText';
import SubHeading from 'components/UI/SubHeading/SubHeading';
import SubHeadingNoColon from 'components/UI/SubHeadingNoColon/SubHeadingNoColon';

type Props = {
    navigation: { navigate: (arg0: string) => any };
};

function TermsScreen(props: Props) {
    return (
        <ScrollView style={{ ...generic.wrap, paddingLeft: styles.padding.md }}>
            <VStack space={3} divider={<Divider />} w="100%">
                <HStack>
                    <Box>
                        <SubHeadingNoColon text={t`Introduction`} />
                        <MediumText>
                            <Trans>
                                This document constitutes a binding agreement between the provider
                                of Mahara Mobile – Catalyst.Net Limited – and yourself. The terms
                                and conditions contained in this document govern your use of Mahara
                                Mobile.
                            </Trans>
                        </MediumText>
                        <MediumText>
                            <LinkText
                                noStartSpace
                                onPress={() => props.navigation.navigate('Privacy')}
                                text={t`The Privacy Statement`}
                            />
                            <MediumText
                                text={t`forms part of these terms and conditions and is hereby incorporated by reference.`}
                            />
                        </MediumText>
                    </Box>
                </HStack>

                <HStack>
                    <Box>
                        <SubHeadingNoColon text={t`Purpose of Mahara Mobile`} />
                        <MediumText>
                            <Trans>
                                Mahara Mobile allows you to upload content from your mobile device
                                into the Mahara site that you are using without needing to go to the
                                Mahara site itself. It is a more convenient way to record and upload
                                images, video, and audio files. It also allows you to create journal
                                entries.
                            </Trans>
                        </MediumText>
                    </Box>
                </HStack>

                <HStack>
                    <Box>
                        <SubHeadingNoColon text={t`Our obligations`} />
                        <MediumText>
                            <Trans>
                                We provide a secure environment that allows you to upload your
                                content to any Mahara site to which you decide to connect.
                            </Trans>
                        </MediumText>
                    </Box>
                </HStack>

                <HStack>
                    <Box>
                        <SubHeadingNoColon text={t`Your obligations`} />
                        <MediumText>
                            <Trans>
                                You must meet the minimum age requirements of the Mahara site to
                                which you want to connect.
                            </Trans>
                        </MediumText>
                        <MediumText>
                            <Trans>
                                All files and content you upload to a Mahara site are subject to
                                copyright law. You are responsible for ensuring you have appropriate
                                permission to reproduce and publish any work that is not your own.
                            </Trans>
                        </MediumText>
                    </Box>
                </HStack>

                <HStack>
                    <Box>
                        <SubHeadingNoColon text={t`Liability`} />
                        <MediumText>
                            <Trans>
                                To the maximum extent permitted by law, we will not be liable to you
                                for any direct, indirect or consequential loss or damages (including
                                but not limited to loss of business profits, business interruption,
                                loss of business information, data, goodwill or other non-pecuniary
                                loss) arising out of or in connection with this agreement or the
                                provision of the website, whether arising from negligence, breach of
                                contract or otherwise.
                            </Trans>
                        </MediumText>
                        <MediumText>
                            <Trans>
                                Our maximum aggregate liability for all lawfully limitable claims
                                under or in connection with this agreement (whether arising from
                                negligence, breach of contract or otherwise) will be NZ$0.
                            </Trans>
                        </MediumText>

                        <MediumText>
                            <Trans>
                                You agree to defend, indemnify and save us, our affiliated and
                                subsidiary corporations, our officers, directors, employees, agents,
                                successors, shareholders and assigns harm from and against all
                                liability, loss, expense, fines, penalties, or damages (including
                                legal costs) to the extent that such claim arises out of or is in
                                any way connected with the non-performance or breach of any
                                obligation imposed on you by this agreement or other general laws
                                and obligations or by reason of and to the extent of your fraud,
                                negligence or wilful misconduct or that of or any of your agents or
                                employees.
                            </Trans>
                        </MediumText>

                        <MediumText>
                            <Trans>
                                We make no representations and give no warranties, guarantees or
                                undertakings concerning our provision or administration of the
                                mobile app, or your use thereof, except as expressly set out in this
                                agreement. Other warranties, express or implied, by statute or
                                otherwise (including but not limited to the warranties of
                                merchantability, fitness for a particular purpose, and satisfactory
                                quality) are excluded from this agreement. It is intended that this
                                clause will apply only to the maximum extent permitted by law: the
                                clause is not intended to exclude the application of the New Zealand
                                Consumer Guarantees Act 1993 or similar law where we are providing
                                services to consumers.
                            </Trans>
                        </MediumText>
                    </Box>
                </HStack>

                <HStack>
                    <Box>
                        <SubHeadingNoColon text={t`Governing Law`} />
                        <MediumText>
                            <Trans>
                                These Terms and Conditions are governed by the laws of New Zealand
                                (excluding its conflict of laws rules), and the courts of New
                                Zealand shall have exclusive jurisdiction to hear and determine any
                                claim arising them.
                            </Trans>
                        </MediumText>
                    </Box>
                </HStack>

                <HStack>
                    <Box>
                        <SubHeadingNoColon text={t`Changes to these Terms and Conditions`} />
                        <MediumText>
                            <Trans>
                                We may occasionally make adjustments to our Terms and Conditions to
                                reflect changes to the system and in response to feedback. As such,
                                we suggest you check the Terms and Conditions each time you visit
                                this app.
                            </Trans>
                        </MediumText>
                    </Box>
                </HStack>

                <HStack>
                    <Box>
                        <SubHeadingNoColon text={t`Contact`} />
                        <MediumText>
                            <Trans>
                                If you have any questions regarding these terms and conditions,
                                please
                            </Trans>

                            <LinkText url="https://mahara.org/contact.php" text={t`contact us.`} />
                        </MediumText>
                    </Box>
                </HStack>
            </VStack>
        </ScrollView>
    );
}

export default TermsScreen;
