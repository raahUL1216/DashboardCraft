import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DashboardDocument = Dashboard & Document;

@Schema()
export class Dashboard {
  @Prop()
  name: string;

  owner_id

  created_at
  updated_at

  shared_with


  layout
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);

const widgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  position: {
    type: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      }
    },
    required: true
  },
  configuration: {
    type: {
      chartType: {
        type: String,
        required: true
      },
      dataSource: {
        type: String,
        required: true
      },
      labels: {
        type: [String],
        required: true
      },
      colors: {
        type: [String],
        required: true
      }
      // Add more specific configuration properties as needed
    },
    required: true
  }
});
