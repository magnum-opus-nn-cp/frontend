import {ReactFCC} from '../../utils/ReactFCC';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '../../lib/react-query';

export const ReactQueryProvider: ReactFCC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}