import { ImageBackground} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as T from '../styling/fonts';
import Card from '../styling/Card';
import { Row} from '../styling/Components';
import { HorizontalDivider, HorizontalSpacing } from '../styling/Divider';
import { colors } from '../styling/colors';

export function ItemCard({item,children}){
    return(
        <Card>
            <ImageBackground
                source= {{uri : item.product.image}} //double {{}} because this is an object literals
                style= {{height:300,width:'100%'}}
                resizeMode="cover"
            />
            <HorizontalSpacing/>
            <T.h1>{item.product.name}</T.h1>
            <HorizontalDivider />

            <Row>
                <Row style={{flexDirection: 'column'}}>
                    <Ionicons name='pricetag-outline' size= {20} color= {colors.orange}/>
                    <T.smlBodText>{item.product.category}</T.smlBodText>
                </Row>
                <Row style={{flexDirection: 'column'}}>
                    <Ionicons name='cash-outline' size= {20} color= {colors.orange}/>
                    <T.smlBodText>{item.product.price} €</T.smlBodText>
                </Row>
                <Row style={{flexDirection: 'column'}}>
                    <Ionicons name='time-outline' size= {20} color= {colors.orange}/>
                    <T.smlBodText>{item.product.dateAdded}</T.smlBodText>
                </Row>  
            </Row>
            <HorizontalDivider /><HorizontalSpacing/>
                                
            <T.h2>About the item:</T.h2>
            <T.smlBodText>{item.product.description}</T.smlBodText>
                            
            <Row>
                <T.h2>Brand:</T.h2>
                <T.smlBodText>{item.product.brand}</T.smlBodText>
            </Row>
            <Row>
                <T.h2>Posted by: </T.h2>
                <T.smlBodText>{item.product.postedBy}</T.smlBodText>   
            </Row>

            <HorizontalSpacing/><HorizontalDivider />
            {children} 
            {/* any children inside of the Card component will inherit its styles and props*/}
        </Card>
    );
    
}