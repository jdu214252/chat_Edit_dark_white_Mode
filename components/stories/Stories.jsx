import React from 'react'
import { ScrollView } from 'react-native'
import StoryItem from './StoryItem';
import AddStoryCard from './AddStoryCard';

export default function Stories() {
  return (
    <ScrollView>
        <AddStoryCard />
        <StoryItem 
            picture="https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            username="Murphy Patrick"
            time="3 Hours ago"
            stories={[
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                },
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                },
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                }
            ]}
        />

        <StoryItem 
            picture="https://images.pexels.com/photos/24531988/pexels-photo-24531988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            username="Alex Jack"
            time="3 Hours ago"
            stories={[
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                },
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                },
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                }
            ]}
        />

        <StoryItem 
            picture="https://images.pexels.com/photos/28858569/pexels-photo-28858569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            username="Nina Gomez"
            time="3 Hours ago"
            stories={[
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                },
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                },
                {
                    time: "3 Hours ago",
                    url: "https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"   
                }
            ]}
        />
    </ScrollView>

  )
}


// const styles = StyleSheet.create({

// })