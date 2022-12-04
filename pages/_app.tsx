import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "../dev";

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <ChakraProvider>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <Component {...pageProps} />
            </DevSupport>
        </ChakraProvider>
    )
}