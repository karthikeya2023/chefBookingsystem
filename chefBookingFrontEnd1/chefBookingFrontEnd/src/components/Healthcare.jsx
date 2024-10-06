import React, { useRef } from 'react';
import "../Healthcare.css";
import healthcareimage from '../assets/Green Modern Download App Document Poster.png'
import gymimg from '../assets/Black Modern.png'




function Healthcare() {
  const diseaseRef = useRef(null);
  const handleClick = () => {
    diseaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className='helthcare'>
        <img src={healthcareimage} alt="Healthcare" className='healthimg'/>
        <button className='find' onClick={handleClick}>Find Now</button>
      <div className='disease' ref={diseaseRef}>
        <h1>DISEASES WITH DIET FOOD</h1>
        <table>
          <tr>
            <th>Diseases</th>
            <th>Diet food</th>
          </tr>
          <tr>
            <td>Diabetes</td>
            <td>Whole grains, leafy greens, lean proteins, and low-glycemic fruits like berries.</td>
          </tr>
          <tr>
            <td>Hypertension (High Blood Pressure)</td>
            <td>Low-sodium foods, fruits like bananas, and vegetables like spinach.</td>
          </tr>
          <tr>
            <td>High Cholesterol</td>
            <td>Oats, nuts, fatty fish (like salmon), and olive oil.</td>
          </tr>
          <tr>
            <td>Anemia</td>
            <td>Iron-rich foods like red meat, spinach, and beans; vitamin C-rich fruits to enhance iron absorption.</td>
          </tr>
          <tr>
            <td>Osteoporosis</td>
            <td>Dairy products, leafy greens, and calcium-fortified foods.</td>
          </tr>
          <tr>
            <td>Gastroesophageal Reflux Disease (GERD)</td>
            <td>Oatmeal, bananas, and lean poultry.</td>
          </tr>
          <tr>
            <td>Irritable Bowel Syndrome (IBS)</td>
            <td>Low-FODMAP foods, such as zucchini, carrots, and white rice.</td>
          </tr>
        </table>
        </div>  
        <div className='gym'>
          <h1>GYM WITH DIET FOOD</h1>
          <img src={gymimg} alt="gym img" className='gymimg'/>

          <table className='gymtable'>
            <tr>
              <th>Day</th>
              <th>Workout</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
              <th>Snacks</th>
            </tr>
            <tr>
              <td>Monday</td>
              <td>Chest & Triceps</td>
              <td>Oats with fruit and nuts</td>
              <td>Grilled chicken, quinoa, vegetables</td>
              <td>Salmon, sweet potatoes, greens</td>
              <td>Greek yogurt, nuts, protein shake</td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td>Back & Biceps</td>
              <td>Greek yogurt, berries, granola</td>
              <td>Turkey wrap, avocado, mixed greens</td>
              <td>Stir-fried tofu, bell peppers, rice</td>
              <td>Cottage cheese, carrot sticks, nuts</td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td>Legs & Shoulders</td>
              <td>Oatmeal, banana, peanut butter</td>
              <td>Salmon, sweet potatoes, asparagus</td>
              <td>Chicken stir-fry, vegetables, noodles</td>
              <td>Rice cakes, peanut butter, protein shake</td>
            </tr>
            <tr>
              <td>Thursday</td>
              <td>Chest & Triceps</td>
              <td>Smoothie (spinach, banana, protein)</td>
              <td>Grilled shrimp, quinoa, zucchini</td>
              <td>Beef stir-fry, broccoli, brown rice</td>
              <td>Mixed nuts, orange, yogurt</td>
            </tr>
            <tr>
              <td>Friday</td>
              <td>Back & Biceps</td>
              <td>Omelette, spinach, mushrooms</td>
              <td>Chicken salad, avocado, whole grain</td>
              <td>Grilled salmon, wild rice, kale</td>
              <td>Hard-boiled eggs, cherry tomatoes, nuts</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>Legs & Shoulders</td>
              <td>Whole-grain pancakes, berries</td>
              <td>Tuna sandwich, whole grain, spinach</td>
              <td>Grilled chicken, sweet potatoes, peas</td>
              <td>Greek yogurt, walnuts, protein bar</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>Core & Cardio</td>
              <td>Chia pudding, almond milk, fruit</td>
              <td>Chia pudding, almond milk, fruit</td>
              <td>Baked tilapia, quinoa, green beans</td>
              <td>Hummus, cucumber slices, protein shake</td>
            </tr>
          </table>
        </div>
    </div>
  );
};

export default Healthcare