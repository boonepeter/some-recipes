import { Recipe } from '../src/types'


const recipes: Recipe[] = [
    {
        id: '0',
        title: 'Meatloaf',
        description: 'Some great meatloaf you all will love',
        link: "https://www.allrecipes.com/recipe/16354/easy-meatloaf/",
        ingredients: [
            '1 c meat',
            '2 c loaf'
        ],
        directions: [
            '1. Take the meat',
            '2. Add the loaf'
        ],
        reviews: [
            'so yummy',
            'I love it',
            'hate it'
        ],
        tags: [
            'dinner',
            'meat',
            'beef'
        ]
    },
    {
        id: '1',
        title: 'Mac and cheese',
        description: 'Some great mac and cheese you all will love',
        ingredients: [
            '1 c mac',
            '2 c cheese'
        ],
        directions: [
            '1. Take the mac',
            '2. Add the cheese'
        ],
        reviews: [
            'so yummy',
            'I love it',
            'hate it'
        ],
        tags: [
            'dinner',
            'cheese',
            'pasta'
        ]
    },
    {
        id: '2',
        title: 'Froot Loops',
        description: 'Some great cereal you all will love',
        ingredients: [
            '1 c froot',
            '2 c loops'
        ],
        directions: [
            '1. Take the fruit',
            '2. Add the loops'
        ],
        reviews: [
            'so yummy',
            'I love it',
            'hate it'
        ],
        tags: [
            'breakfast',
            'cereal',
            'sweet'
        ]
    },
]

export default recipes;