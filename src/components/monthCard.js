import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
  import folder from "../folder.svg";
  import calendar from "../calendar.svg"

  export default function ProductMonth(props) {
    return (
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            //mt={}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${folder})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={calendar}
              
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'} as={Link}
              to={"/invoice/"+ props.name}>
              Month
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} as={Link} to={"/invoice/"+ props.name}>
              {props.name}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
                {props.price}
              </Text>
              <Text fontWeight={800} fontSize={'xl'}>
                {props.supplier}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }