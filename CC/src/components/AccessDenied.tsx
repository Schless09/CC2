'use client';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const AccessDenied = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box className='flex flex-col items-center justify-center h-screen mt-[-64px] w-full'>
      <Box className='flex flex-col items-center justify-center'>
        <SentimentDissatisfiedIcon
          style={{ fontSize: '50px', color: '#999' }}
        />
        <Typography
          variant={isSmallScreen ? 'h4' : 'h3'}
          component='h3'
          className='font-bold text-center'
        >
          {title}
        </Typography>
      </Box>

      <Typography
        variant='body1'
        color='textSecondary'
        fontSize='1.2em'
        marginTop='5px'
        textAlign='center'
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default AccessDenied;
